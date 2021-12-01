import { ComponentProps } from "react";
import Badge from "./Badge";
import { Project } from "@typeDefs/project";

type ProjectCardProps = ComponentProps<"section"> & Project;

const ProjectCard = ({
  title,
  description,
  websiteUrl,
  repositoryUrl,
  badges,
  ...props
}: ProjectCardProps) => {
  return (
    <section
      className="flex flex-col p-5 shadow rounded divide-solid divide-y"
      {...props}
    >
      <div className="pb-3 space-y-2">
        <h1 className="text-black font-bold">{title}</h1>
        <p className="text-black text-sm">{description}</p>
        {badges && (
          <div className="flex flex-row flex-wrap -mt-1">
            {badges.map((badge, index) => (
              <Badge key={index} text={badge.text} color={badge.color} />
            ))}
          </div>
        )}
      </div>
      {(websiteUrl || repositoryUrl) && (
        <div className="pt-3 flex flex-row text-sm space-x-4">
          {websiteUrl && (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
              Website
            </a>
          )}
          {repositoryUrl && (
            <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
              Repository
            </a>
          )}
        </div>
      )}
    </section>
  );
};

export default ProjectCard;
