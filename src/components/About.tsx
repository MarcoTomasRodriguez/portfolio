import React from "react";
import { ArrowDownIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";

export default function About(): JSX.Element {
  const { t } = useTranslation("about");

  return (
    <div
      id="about"
      className="relative grid place-content-center min-w-screen min-h-screen bg-primary p-12"
    >
      <p className="text-center text-white font-bold text-2xl py-4 font-sans">
        {t("introduction")}
      </p>
      <p className="text-center text-white text-xl py-4">{t("profession")}</p>
      <button
        className="absolute text-white w-6 h-6 animate-bounce left-1/2 right-1/2 bottom-10"
        onClick={() => {
          const element = document.getElementById("experience");
          if (element) {
            element.scrollIntoView();
          }
        }}
      >
        <ArrowDownIcon />
      </button>
    </div>
  );
}
