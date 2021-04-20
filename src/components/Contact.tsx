import React from "react";
import { CodeIcon, MailIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";

export default function Contact(): JSX.Element {
  const { t } = useTranslation("contact");

  return (
    <div id="contact" className="w-full h-full py-12 grid grid-cols-5">
      <div className="h-full p-8 col-span-5 md:col-span-3 flex flex-col space-y-8 justify-center">
        <p className="text-xl text-center font-bold">{t("title")}</p>
        <p className="text-center text-sm text-opacity-90">{t("body")}</p>
        <div className="flex flex-row space-x-7 justify-center">
          <a className="w-6 h-6" href="mailto:marcotomasrodriguez@gmail.com">
            <MailIcon />
          </a>
          <a
            className="w-6 h-6"
            href="https://github.com/MarcoTomasRodriguez"
            target="_blank"
          >
            <CodeIcon />
          </a>
        </div>
      </div>
      <form
        action="#"
        method="POST"
        className="p-4 col-span-5 md:col-span-2 flex flex-col space-y-6"
      >
        <div className="space-y-1">
          <label htmlFor="name">{t("nameLabel")}</label>
          <input name="name" type="text" placeholder="Aspen Collins" />
        </div>
        <div className="space-y-1">
          <label htmlFor="email">{t("emailLabel")}</label>
          <input name="email" type="email" placeholder="aspen@enterprise.com" />
        </div>
        <div className="space-y-1">
          <label htmlFor="message">{t("messageLabel")}</label>
          <textarea name="message" rows={9} placeholder="Hello Marco," />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center w-full p-2 text-sm font-bold rounded-md bg-blue-700 hover:bg-blue-800 text-white"
        >
          {t("sendButton")}
        </button>
      </form>
    </div>
  );
}
