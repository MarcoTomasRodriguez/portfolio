import { ComponentProps } from "react";
import { Badge, BadgeProps } from "../Badge";

export type ProjectProps = ComponentProps<"div"> & {
  title: string;
  description: string;
  websiteUrl?: string;
  repositoryUrl?: string;
  badges?: BadgeProps[];
};

export function Project({
  title,
  description,
  websiteUrl,
  repositoryUrl,
  badges,
  ...props
}: ProjectProps) {
  return (
    <div
      className="flex flex-col p-5 shadow rounded space-y-2"
      {...props}
    >
      <div className="divide-solid divide-y">
        <div className="pb-3 space-y-2">
          <p className="text-black font-bold">{title}</p>
          <p className="text-black text-sm">{description}</p>
          {badges && (
            <div className="flex flex-row -mt-1 space-x-1">
              {badges.map((badge, index) => (
                <Badge key={index} text={badge.text} color={badge.color} />
              ))}
            </div>
          )}
        </div>
        {(websiteUrl || repositoryUrl) && (
          <div className="pt-3">
            <div className="flex flex-row text-sm space-x-4">
              {websiteUrl && (
                <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              )}
              {repositoryUrl && (
                <a
                  href={repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Repository
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
