import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Badge, BadgeProps } from "../Badge"

type Experience = {
  years: string;
  title: string;
  company: string;
  description: string;
  logo?: string;
  badges?: BadgeProps[];
};

type ExperienceProps = {
  experience: Experience[];
};

export default function Experience({ experience }: ExperienceProps) {
  const { t } = useTranslation("experience");

  return (
    <section id="experience" className="py-12 w-full h-full">
      <h1 className="font-bold text-xl mb-7">{t("title")}</h1>
      <div className="flex flex-col space-y-6">
        {experience.map((experience, index) => (
          <div key={index} className="flex flex-col p-5 space-y-2 shadow rounded">
            <div key={index} className="flex flex-row space-x-4">
              <div className="relative w-14 h-14 my-1">
                <Image
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                  src={experience.logo || "/img/default-company.png"}
                  alt={`${experience.company} logo`}
                />
              </div>
              <div>
                <p className="font-bold">{experience.title}</p>
                <p className="text-sm">{experience.company}</p>
                <p className="text-sm opacity-80">{experience.years}</p>
              </div>
            </div>
            <p className="text-sm">{experience.description}</p>
            {experience.badges && (
            <div className="flex flex-row flex-wrap -mt-1">
              {experience.badges.map((badge, index) => (
                <Badge key={index} text={badge.text} color={badge.color} />
              ))}
            </div>
          )}
          </div>
        ))}
      </div>
    </section>
  );
}
