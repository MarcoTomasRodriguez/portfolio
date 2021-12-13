import { ComponentProps } from "react";
import Image from "next/image";
import { Experience } from "@typeDefs/experience";
import Badge from "./Badge";

type ExperienceCardProps = ComponentProps<"section"> & Experience;

const ExperienceCard = ({
  logo,
  title,
  company,
  years,
  points,
  badges,
  ...props
}: ExperienceCardProps) => {
  return (
    <section className="flex flex-col p-5 space-y-2 shadow rounded" {...props}>
      {/* <section className="flex flex-col p-5 space-y-2 shadow rounded" {...props}> */}
      <div className="flex flex-row space-x-4">
        <div className="relative w-14 h-14 my-1">
          <Image
            layout="fill"
            objectFit="cover"
            className="rounded"
            src={logo || "/img/default-company.png"}
            alt={`${company} logo`}
          />
        </div>
        <div>
          <h1 className="font-bold">{title}</h1>
          <p className="text-sm">{company}</p>
          <p className="text-sm opacity-80">{years}</p>
        </div>
      </div>
      <ul className="list-disc list-inside text-sm">
        {points?.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      <div className="flex flex-row flex-wrap -mt-1">
        {badges.map((badge, index) => (
          <Badge key={index} text={badge.text} color={badge.color} />
        ))}
      </div>
    </section>
  );
};

export default ExperienceCard;
