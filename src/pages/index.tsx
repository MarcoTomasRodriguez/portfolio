import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "../components/Header";
import About from "../components/About";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <div className="px-12 divide-y-2 divide-solid">
        <Experience />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home"])),
  },
});
