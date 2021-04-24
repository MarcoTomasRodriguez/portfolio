import { ArrowDownIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation("about");

  return (
    <div
      id="about"
      className="relative grid place-content-center min-w-screen min-h-screen bg-primary p-12"
    >
      <p className="text-center text-2xl text-white font-bold font-sans py-4">
        {t("introduction")}
      </p>
      <p className="text-center text-xl text-white py-4">{t("profession")}</p>
      <button
        className="absolute w-6 h-6 text-white animate-bounce left-1/2 right-1/2 bottom-10 -ml-3"
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
