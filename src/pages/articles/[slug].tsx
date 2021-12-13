import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@components/Layout";

type ArticleProps = {
  title: string;
  type: string;
  source: MDXRemoteSerializeResult;
};

function Article({ title, type, source }: ArticleProps) {
  return (
    <Layout site="blog" title={title} description={title}>
      <article className="py-8 px-6 sm:px-8">
        <header>
          <h1 className="flex flex-col items-center">
            <span className="text-primary font-semibold tracking-wide uppercase">
              {type}
            </span>
            <span className="mt-2 text-gray-900 font-extrabold text-3xl sm:text-4xl tracking-tight">
              {title}
            </span>
          </h1>
          <hr className="mt-8 border-t-2 w-60 mx-auto" />
        </header>
        <div className="mt-8 mx-auto prose">
          <MDXRemote {...source} />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const files = fs.readdirSync("public/articles");
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
}: any) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("public/articles", slug + ".mdx"),
    "utf-8"
  );

  const {
    data: { title, type },
    content,
  } = matter(markdownWithMeta);

  const source = await serialize(content);

  return {
    props: { title, type, source },
  };
};

export default Article;
