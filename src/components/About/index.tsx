import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowDownIcon } from "@heroicons/react/outline";
import Typewriter from "../Typewriter";

export default function About() {
  const { t } = useTranslation("about");
  const [displayProfession, setDisplayProfession] = useState(false);

  useEffect(() => {
    const timeToPrintIntroduction = t("introduction").length * 60;
    setTimeout(() => setDisplayProfession(true), timeToPrintIntroduction + 100);
  }, [t]);

  return (
    <div id="about" className="relative min-w-screen min-h-screen grid place-content-center bg-primary text-white text-center p-6 space-y-8">
      <Typewriter className="text-2xl font-bold" text={t("introduction")} />
      {displayProfession && <Typewriter className="text-xl" text={t("profession")} />}
      <a href="#experiences" className="absolute w-6 h-6 left-1/2 right-1/2 bottom-10 -ml-3 animate-bounce" aria-label="Scroll to experience">
        <ArrowDownIcon />
      </a>
    </div>
  );
}
