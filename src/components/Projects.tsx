import React from "react";
import { useTranslation } from "react-i18next";

interface Project {
  title: string;
  repository: string;
  description: string;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps): JSX.Element {
  const { t } = useTranslation("projects");

  return (
    <div id="projects" className="py-12 w-full h-full">
      <p className="text-black font-bold text-xl mb-7">{t("title")}</p>
      <div className="flex flex-col space-y-6">
        {projects &&
          projects.map((project, index) => (
            <div key={index} className="flex flex-col p-5 shadow rounded">
              <p className="text-black font-bold">{project.title}</p>
              <p className="text-black mt-3 text-sm">{project.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
