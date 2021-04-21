import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "../components/Header";
import About from "../components/About";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import experience from "../content/experience.json";
import projects from "../content/projects.json";

export default function Home() {
  return (
    <>
      <Head>
        <title>Marco Tom&aacute;s Rodr&iacute;guez</title>
        <meta name="description" content="Portfolio of Marco Tomas Rodriguez" />
      </Head>
      <Header />
      <About />
      <div className="px-12 divide-y-2 divide-solid">
        <Experience experience={experience} />
        <Projects projects={projects} />
        <Contact />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "about",
        "contact",
        "experience",
        "header",
        "projects",
      ])),
    },
  };
}
