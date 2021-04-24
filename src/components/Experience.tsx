import Image from "next/image";
import { useTranslation } from "react-i18next";

type Experience = {
  years: string;
  title: string;
  company: string;
  logo: string;
  description: string;
};

type ExperienceProps = {
  experience: Experience[];
};

export default function Experience({ experience }: ExperienceProps) {
  const { t } = useTranslation("experience");

  return (
    <div id="experience" className="py-12 w-full h-full">
      <p className="font-bold text-xl mb-7">{t("title")}</p>
      <div className="flex flex-col space-y-6">
        {experience.map((experience, index) => (
          <div
            key={index}
            className="flex flex-col p-5 space-y-2 shadow rounded"
          >
            <div key={index} className="flex flex-row space-x-4">
              <div className="relative w-14 h-14 my-1">
                <Image
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                />
              </div>
              <div>
                <p className="font-semibold">{experience.title}</p>
                <p className="text-sm">{experience.company}</p>
                <p className="text-sm opacity-80">{experience.years}</p>
              </div>
            </div>
            <p className="text-sm">{experience.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
