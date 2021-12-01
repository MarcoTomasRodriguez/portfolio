import { Badge } from "@typeDefs/badge";

export type Project = {
  title: string;
  description: string;
  websiteUrl?: string;
  repositoryUrl?: string;
  badges?: Badge[];
};
