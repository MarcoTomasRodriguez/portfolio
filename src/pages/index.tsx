import fs from "fs";
import path from "path";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "../components/Header";
import About from "../components/About";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Projects from "../components/Projects";

export default function Home({ experience, projects }) {
  return (
    <>
      <Head>
        <title>Marco Tom&aacute;s Rodr&iacute;guez</title>
        <meta name="description" content="Portfolio of Marco Tomas Rodriguez" />
      </Head>
      <Header />
      <About />
      <div className="divide-solid divide-y-2 px-6 md:px-8 lg:px-12 ">
        <Experience experience={experience} />
        <Projects projects={projects} />
        <Contact />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const contentDirectory = path.join(process.cwd(), `public/content/${locale}`);

  const experiencePath = path.join(contentDirectory, "experience.json");
  const experienceRaw = fs.existsSync(experiencePath)
    ? fs.readFileSync(experiencePath, "utf-8")
    : null;

  const projectsPath = path.join(contentDirectory, "projects.json");
  const projectsRaw = fs.existsSync(projectsPath)
    ? fs.readFileSync(projectsPath, "utf-8")
    : null;

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "about",
        "contact",
        "experience",
        "header",
        "projects",
      ])),
      experience: JSON.parse(experienceRaw) || [],
      projects: JSON.parse(projectsRaw) || [],
    },
  };
}
