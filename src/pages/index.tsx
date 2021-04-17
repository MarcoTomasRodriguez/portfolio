import About from "../components/About";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <>
      <About />
      <div className="px-12 divide-y-2 divide-solid">
        <Experience />
        <Projects />
        <Contact />
      </div>
    </>
  );
}
