import { Badge } from "@typeDefs/badge";

export type Experience = {
  years: string;
  title: string;
  company: string;
  points?: string[];
  logo?: string;
  badges: Badge[];
};
