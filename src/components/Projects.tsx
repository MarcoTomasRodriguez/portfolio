import { useTranslation } from "react-i18next";

type Project = {
  title: string;
  description: string;
  websiteUrl?: string;
  repositoryUrl?: string;
};

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  const { t } = useTranslation("projects");

  return (
    <div id="projects" className="py-12 w-full h-full">
      <p className="text-black font-bold text-xl mb-7">{t("title")}</p>
      <div className="flex flex-col space-y-6">
        {projects &&
          projects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col p-5 shadow rounded space-y-2"
            >
              <p className="text-black font-bold">{project.title}</p>
              <p className="text-black text-sm">{project.description}</p>
              <div className="flex flex-row text-sm space-x-4">
                {project.websiteUrl && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                )}
                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repository
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
