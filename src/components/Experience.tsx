import React from "react";

const CARD_EXAMPLE = {
  years: "2020 - 2021",
  title: "Software Engineer",
  company: "BlueSensor",
  logo: "/img/bluesensor-logo.png",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a rutrum tortor, ut fermentum ligula. Ut consectetur convallis justo, nec hendrerit orci egestas vel. Aenean cursus efficitur elit, rutrum imperdiet lorem pharetra et. Maecenas quis sollicitudin felis. Donec vel nulla vel dolor ullamcorper dignissim. Nunc dictum quis sapien ut viverra. Suspendisse elit orci, tincidunt sit amet purus at, tempor iaculis enim. In hac habitasse platea dictumst.",
};

const CARDS = [CARD_EXAMPLE, CARD_EXAMPLE];

function Experience(): JSX.Element {
  return (
    <div className="min-w-screen min-h-screen bg-white">
      <div className="p-12 w-full h-full">
        <p className="text-black font-bold text-xl mb-7">
          Professional Experience
        </p>
        <div className="flex flex-col space-y-6">
          {CARDS.map((experience) => (
            <div className="flex flex-row space-x-4 p-4 shadow rounded">
              <img
                className="w-16 h-16 rounded"
                src={experience.logo}
                alt={`${experience.company} logo`}
              />
              <div>
                <p className="text-black font-semibold">{experience.title}</p>
                <p className="text-black text-sm">{experience.company}</p>
                <p className="text-black text-sm opacity-80">
                  {experience.years}
                </p>
                <p className="text-black mt-2 text-sm">
                  {experience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Experience;
