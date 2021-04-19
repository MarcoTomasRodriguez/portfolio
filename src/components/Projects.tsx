import React from "react";
import { useTranslation } from "react-i18next";

const CARD_EXAMPLE = {
  key: 1,
  title: "hget",
  repository: "https://github.com/MarcoTomasRodriguez/hget",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a rutrum tortor, ut fermentum ligula. Ut consectetur convallis justo, nec hendrerit orci egestas vel. Aenean cursus efficitur elit, rutrum imperdiet lorem pharetra et. Maecenas quis sollicitudin felis. Donec vel nulla vel dolor ullamcorper dignissim. Nunc dictum quis sapien ut viverra. Suspendisse elit orci, tincidunt sit amet purus at, tempor iaculis enim. In hac habitasse platea dictumst.",
};

const CARDS = [CARD_EXAMPLE, CARD_EXAMPLE];

export default function Projects(): JSX.Element {
  const { t } = useTranslation("projects");

  return (
    <div id="projects" className="py-12 w-full h-full">
      <p className="text-black font-bold text-xl mb-7">{t("title")}</p>
      <div className="flex flex-col space-y-6">
        {CARDS.map((project, index) => (
          <div key={index} className="flex flex-col p-5 shadow rounded">
            <p className="text-black font-bold">{project.title}</p>
            <p className="text-black mt-3 text-sm">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
