import fs from "fs";
import path from "path";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import matter from "gray-matter";
import Layout from "@components/Layout";
import Card from "@components/Card";
import { Article } from "@typeDefs/article";

type ArticlesProps = {
  articles: Article[];
};

const Articles = ({ articles }: ArticlesProps) => {
  return (
    <Layout site="blog" title="Articles" description="Articles">
      <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {articles.map((article, index) => (
          <Link key={index} href={`/articles/${article.slug}`} passHref>
            <Card className="w-full flex cursor-pointer">
              <div className="flex-1 flex-shrink mr-10">
                <Card.Title>{article.meta.title}</Card.Title>
                <Card.Content>
                  <p className="line-clamp-3">{article.meta.abstract}</p>
                  <p className="mt-2">{article.meta.date}</p>
                </Card.Content>
              </div>
              <div className="flex-1 flex-grow relative -m-5">
                <Image
                  layout="fill"
                  objectFit="cover"
                  className="rounded-r"
                  src={"/img/default-company.png"}
                  alt="Thumbnail"
                />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync("public/articles");

  const articles = files.map((filename) => ({
    meta: matter(
      fs.readFileSync(path.join("public/articles", filename), "utf-8")
    ).data,
    slug: filename.split(".")[0],
  }));

  return { props: { articles } };
};

export default Articles;
