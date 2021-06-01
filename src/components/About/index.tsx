import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowDownIcon } from "@heroicons/react/outline";
import TypewriterAnimation from "../animations/TypewriterAnimation";

export default function About() {
  const [displayProfession, setDisplayProfession] = useState(false);

  const { t } = useTranslation("about");

  useEffect(() => {
    setTimeout(
      () => setDisplayProfession(true),
      t("introduction").length * 75 + 100
    );
  }, []);

  const scrollToExperience = () => {
    const element = document.getElementById("experience");

    if (element) {
      element.scrollIntoView();
    }
  };

  return (
    <div
      id="about"
      className="relative min-w-screen min-h-screen grid place-content-center bg-primary text-white text-center p-6 space-y-8"
    >
      <TypewriterAnimation
        className="text-2xl font-bold"
        text={t("introduction")}
      />

      {displayProfession && (
        <TypewriterAnimation className="text-xl" text={t("profession")} />
      )}
      <button
        className="absolute w-6 h-6 left-1/2 right-1/2 bottom-10 -ml-3 animate-bounce"
        onClick={scrollToExperience}
      >
        <ArrowDownIcon />
      </button>
    </div>
  );
}
