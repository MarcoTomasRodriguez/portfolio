import { useTranslation } from "react-i18next";
import { Project, ProjectProps } from "./Project";

export type ProjectsProps = {
  projects: ProjectProps[];
};

export default function Projects({ projects }: ProjectsProps) {
  const { t } = useTranslation("projects");

  return (
    <section id="projects" className="py-12 w-full h-full">
      <h1 className="text-black font-bold text-xl mb-7">{t("title")}</h1>
      <div className="flex flex-col space-y-6">
        {projects &&
          projects.map((project: ProjectProps, index) => (
            <Project {...project} key={index} />
          ))}
      </div>
    </section>
  );
}
