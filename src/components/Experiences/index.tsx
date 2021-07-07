import { useTranslation } from "react-i18next";
import Section from "../Section";
import Experience, { ExperienceProps } from "./Experience";

type ExperiencesProps = {
  experience: ExperienceProps[];
};

export default function Experiences({ experience }: ExperiencesProps) {
  const { t } = useTranslation("experience");

  return (
    <Section id="experiences" title={t("title")}>
      <div className="flex flex-col space-y-6">
        {experience && (
          experience.map((experience: ExperienceProps, index) => (
            <Experience {...experience} key={index} />
          ))
        )}
      </div>
    </Section>
  );
}
