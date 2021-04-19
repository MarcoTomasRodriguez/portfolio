import React from "react";
import { useTranslation } from "react-i18next";

const CARD_EXAMPLE = {
  years: "2020 - 2021",
  title: "Software Engineer",
  company: "BlueSensor",
  logo: "/img/bluesensor-logo.png",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a rutrum tortor, ut fermentum ligula. Ut consectetur convallis justo, nec hendrerit orci egestas vel. Aenean cursus efficitur elit, rutrum imperdiet lorem pharetra et. Maecenas quis sollicitudin felis. Donec vel nulla vel dolor ullamcorper dignissim. Nunc dictum quis sapien ut viverra. Suspendisse elit orci, tincidunt sit amet purus at, tempor iaculis enim. In hac habitasse platea dictumst.",
};

const CARDS = [CARD_EXAMPLE, CARD_EXAMPLE];

export default function Experience(): JSX.Element {
  const { t } = useTranslation("experience");

  return (
    <div id="experience" className="py-12 w-full h-full">
      <p className="font-bold text-xl mb-7">{t("title")}</p>
      <div className="flex flex-col space-y-6">
        {CARDS.map((experience, index) => (
          <div
            key={index}
            className="flex flex-col p-5 space-y-2 shadow rounded"
          >
            <div key={index} className="flex flex-row space-x-4">
              <img
                className="w-14 h-14 rounded my-1"
                src={experience.logo}
                alt={`${experience.company} logo`}
              />
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
