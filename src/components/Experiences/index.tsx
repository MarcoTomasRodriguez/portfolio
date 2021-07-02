import { useTranslation } from "react-i18next";
import Experience, { ExperienceProps } from "./Experience";

type ExperiencesProps = {
  experience: ExperienceProps[];
};

export default function Experiences({ experience }: ExperiencesProps) {
  const { t } = useTranslation("experience");

  return (
    <section id="experiences" className="py-12 w-full h-full">
      <h1 className="font-bold text-xl mb-7">{t("title")}</h1>
      <div className="flex flex-col space-y-6">
        {experience && (
          experience.map((experience: ExperienceProps, index) => (
            <Experience {...experience} key={index} />
          ))
        )}
      </div>
    </section>
  );
}
