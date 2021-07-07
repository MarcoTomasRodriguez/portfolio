import { useTranslation } from "react-i18next";
import Section from "../Section";
import { Project, ProjectProps } from "./Project";

export type ProjectsProps = {
  projects: ProjectProps[];
};

export default function Projects({ projects }: ProjectsProps) {
  const { t } = useTranslation("projects");

  return (
    <Section id="projects" title={t("title")}>
      <div className="flex flex-col space-y-6">
        {projects &&
          projects.map((project: ProjectProps, index) => (
            <Project {...project} key={index} />
          ))}
      </div>
    </Section>
  );
}
