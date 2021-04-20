import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fromEvent } from "rxjs";
import {
  BriefcaseIcon,
  CodeIcon,
  MailIcon,
  TranslateIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { Menu } from "@headlessui/react";
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime,
} from "rxjs/operators";
import { useTranslation } from "react-i18next";

enum Direction {
  Up = "Up",
  Down = "Down",
}
interface HeaderButton {
  title: string;
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  onClick: () => void;
}

function navigateToElementById(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView();
  }
}

export default function Header(): JSX.Element {
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

  const buttons = [
    {
      title: t("about"),
      icon: (props) => <UserIcon {...props} />,
      onClick: () => navigateToElementById("about"),
    },
    {
      title: t("experience"),
      icon: (props) => <BriefcaseIcon {...props} />,
      onClick: () => navigateToElementById("experience"),
    },
    {
      title: t("projects"),
      icon: (props) => <CodeIcon {...props} />,
      onClick: () => navigateToElementById("projects"),
    },
    {
      title: t("contact"),
      icon: (props) => <MailIcon {...props} />,
      onClick: () => navigateToElementById("contact"),
    },
  ] as HeaderButton[];

  const languages = [
    {
      language: "English",
      code: "en",
    },
    {
      language: "Deutsch",
      code: "de",
    },
    {
      language: "Español",
      code: "es",
    },
  ];

  return (
    <header
      className={`fixed flex flex-row space-x-8 sm:space-x-6 md:space-x-14 justify-center w-full z-50 bg-primary p-2 transition transform duration-200 ease-in ${
        visibility ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {buttons.map((button, index) => (
        <button
          key={index}
          className="flex flex-row text-sm text-white font-bold p-3 rounded hover:bg-black hover:bg-opacity-10"
          onClick={button.onClick}
        >
          <button.icon
            className="visible sm:invisible h-5 w-5 sm:h-0 sm:w-0"
            viewBox="0 0 20 20"
          />
          <p className="invisible sm:visible h-0 w-0 sm:h-auto sm:w-auto">
            {button.title}
          </p>
        </button>
      ))}
      <Menu as="div" className="relative">
        <Menu.Button className="inline-flex justify-center w-full rounded-md text-sm font-bold text-white p-3 hover:bg-black hover:bg-opacity-10 focus:outline-none">
          <p className="invisible sm:visible h-0 w-0 sm:h-auto sm:w-auto">
            {t("changeLanguage")}
          </p>
          <TranslateIcon
            className="visible sm:invisible h-5 w-5 sm:h-0 sm:w-0 -mr-1 ml-2 sm:mr-0 sm:ml-0"
            aria-hidden="true"
          />
        </Menu.Button>
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
      </Menu>
    </header>
  );
}
