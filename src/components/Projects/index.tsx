import { useTranslation } from "react-i18next";
import { Project, ProjectProps } from "./Project";

export type ProjectsProps = {
  projects: ProjectProps[];
};

export default function Projects({ projects }: ProjectsProps) {
  const { t } = useTranslation("projects");

  return (
    <div id="projects" className="py-12 w-full h-full">
      <p className="text-black font-bold text-xl mb-7">{t("title")}</p>
      <div className="flex flex-col space-y-6">
        {projects &&
          projects.map((project: ProjectProps, index) => (
            <Project {...project} key={index} />
          ))}
      </div>
    </div>
  );
}
