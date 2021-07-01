import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowDownIcon } from "@heroicons/react/outline";
import Typewriter from "../animations/Typewriter";

export default function About() {
  const [displayProfession, setDisplayProfession] = useState(false);

  const { t } = useTranslation("about");

  useEffect(() => {
    setTimeout(
      () => setDisplayProfession(true),
      t("introduction").length * 60 + 100
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
      <Typewriter
        className="text-2xl font-medium"
        text={t("introduction")}
      />

      {displayProfession && (
        <Typewriter className="text-xl" text={t("profession")} />
      )}
      <button
        className="absolute w-6 h-6 left-1/2 right-1/2 bottom-10 -ml-3 animate-bounce"
        onClick={scrollToExperience}
        aria-label="Scroll to experience"
      >
        <ArrowDownIcon />
      </button>
    </div>
  );
}
