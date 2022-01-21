import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Menu } from "@headlessui/react";
import {
  BriefcaseIcon,
  CodeIcon,
  MailIcon,
  TranslateIcon,
  UserIcon,
  NewspaperIcon,
  SpeakerphoneIcon,
} from "@heroicons/react/solid";
import useScrollableHide from "@hooks/useScrollableHide";
import HeaderLink from "./HeaderLink";

const PortfolioHeader = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const hidden = useScrollableHide();

  const languages = [
    { language: "English", code: "en" },
    { language: "Deutsch", code: "de" },
    { language: "Español", code: "es" },
  ];

  return (
    <header
      className={`fixed flex flex-row space-x-8 sm:space-x-6 md:space-x-7 lg:space-x-14 justify-center w-full z-50 bg-primary p-2 transition duration-200 ease-in ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <HeaderLink title={t("header.about")} url="#about" Icon={UserIcon} />
      <HeaderLink
        title={t("header.experience")}
        url="#experience"
        Icon={BriefcaseIcon}
      />
      <HeaderLink
        title={t("header.projects")}
        url="#projects"
        Icon={CodeIcon}
      />
      <HeaderLink
        title={t("header.articles")}
        url="#articles"
        Icon={NewspaperIcon}
      />
      <HeaderLink
        title={t("header.languages")}
        url="#languages"
        Icon={SpeakerphoneIcon}
      />
      <HeaderLink title={t("header.contact")} url="#contact" Icon={MailIcon} />
      <Menu as="div" className="relative">
        <Menu.Button
          className="inline-flex justify-center w-full rounded-md text-sm text-white p-2 hover:bg-black hover:bg-opacity-10 focus:outline-none"
          aria-label="Change language"
        >
          <p className="invisible sm:visible h-0 w-0 sm:h-auto sm:w-auto">
            {t("header.changeLanguage")}
          </p>
          <TranslateIcon
            aria-hidden="true"
            className="visible sm:invisible h-5 w-5 sm:h-0 sm:w-0 -mr-1 ml-2 sm:mr-0 sm:ml-0"
          />
        </Menu.Button>
        {!hidden && (
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
