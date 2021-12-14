import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { fromEvent } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime,
} from "rxjs/operators";
import { Menu } from "@headlessui/react";
import {
  BriefcaseIcon,
  CodeIcon,
  MailIcon,
  TranslateIcon,
  UserIcon,
} from "@heroicons/react/solid";
import HeaderLink from "./HeaderLink";

enum Direction {
  Up = "Up",
  Down = "Down",
}

const PortfolioHeader = () => {
  const router = useRouter();

  const { t } = useTranslation("header");
  const [visibility, setVisibility] = useState(true);

  useEffect(() => {
    // window.scroll observable.
    const scroll$ = fromEvent(window, "scroll").pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]) => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    // On scroll up, set header visibility to true.
    scroll$
      .pipe(filter((direction) => direction === Direction.Up))
      .subscribe(() => setVisibility(() => true));

    // On scroll down, set header visibility to false.
    scroll$
      .pipe(filter((direction) => direction === Direction.Down))
      .subscribe(() => setVisibility(() => false));
  }, []);

  const languages = [
    { language: "English", code: "en" },
    { language: "Deutsch", code: "de" },
    { language: "Español", code: "es" },
  ];

  return (
    <header
      className={`fixed flex flex-row space-x-8 sm:space-x-6 md:space-x-7 lg:space-x-14 justify-center w-full z-50 bg-primary p-2 transition duration-200 ease-in ${
        visibility ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <HeaderLink title={t("about")} url="#about" Icon={UserIcon} />
      <HeaderLink
        title={t("experience")}
        url="#experience"
        Icon={BriefcaseIcon}
      />
      <HeaderLink title={t("projects")} url="#projects" Icon={CodeIcon} />
      <HeaderLink title={t("contact")} url="#contact" Icon={MailIcon} />
      <Menu as="div" className="relative">
        <Menu.Button
          className="inline-flex justify-center w-full rounded-md text-sm text-white p-2 hover:bg-black hover:bg-opacity-10 focus:outline-none"
          aria-label="Change language"
        >
          <p className="invisible sm:visible h-0 w-0 sm:h-auto sm:w-auto">
            {t("changeLanguage")}
          </p>
          <TranslateIcon
            aria-hidden="true"
            className="visible sm:invisible h-5 w-5 sm:h-0 sm:w-0 -mr-1 ml-2 sm:mr-0 sm:ml-0"
          />
        </Menu.Button>
        {visibility && (
          <Menu.Items className="absolute origin-top-right right-0 mt-2 w-40 rounded-md bg-white shadow-lg divide-y divide-gray-100 focus:outline-none py-2">
            {languages.map((lang, index) => (
              <Menu.Item
                key={index}
                as="button"
                className="w-full px-4 py-3 text-left text-sm text-gray-800 hover:bg-gray-200"
                onClick={() => router.push("", "", { locale: lang.code })}
              >
                {lang.language}
              </Menu.Item>
            ))}
          </Menu.Items>
        )}
      </Menu>
    </header>
  );
};

export default PortfolioHeader;
