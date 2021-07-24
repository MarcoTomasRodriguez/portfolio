import { useState } from "react";
import Image from "next/image";
import Joi from "joi";
import { MailIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import InputField from "../forms/InputField";
import TextareaField from "../forms/TextareaField";
import StatusButton, { RequestStatus } from "../forms/StatusButton";
import { EmailInformation, sendEmail } from "../../libs/mailer";

const emailFormSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(2)
    .max(64)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  message: Joi.string()
    .min(64)
    .max(2048)
    .required(),
});

export default function Contact() {
  const { t } = useTranslation("contact");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(emailFormSchema) });

  const [emailStatus, setEmailStatus] = useState(RequestStatus.None);

  const onSubmit = (data: EmailInformation) => {
    setEmailStatus(() => RequestStatus.Pending);

    sendEmail(data)
      .then(() => setEmailStatus(() => RequestStatus.Success))
      .catch(() => setEmailStatus(() => RequestStatus.Failure));
  };

  return (
    <section id="contact" className="w-full h-full py-12 grid grid-cols-5">
      <div className="h-full p-8 col-span-5 md:col-span-3 flex flex-col space-y-8 justify-center">
        <h1 className="text-xl font-bold text-center">{t("title")}</h1>
        <p className="text-center text-sm text-opacity-90">{t("body")}</p>
        <div className="flex flex-row space-x-7 justify-center">
          <a className="w-6 h-6" href="mailto:marcotomasrodriguez@gmail.com" aria-label="Send email">
            <MailIcon />
          </a>
          <a className="w-6 h-6" href="https://github.com/MarcoTomasRodriguez" target="_blank" rel="noreferrer" aria-label="Visit GitHub profile">
            <Image src="/svg/github.svg" alt="github" width="24" height="24" />
          </a>
          <a className="w-6 h-6" href=" www.linkedin.com/in/marcotomasrodriguez" target="_blank" rel="noreferrer" aria-label="Visit LinkedIn profile">
            <Image src="/svg/linkedin.svg" alt="github" width="24" height="24" />
          </a>
        </div>
      </div>
      <form className="flex flex-col p-4 col-span-5 md:col-span-2 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="text"
          placeholder="Aspen Collins"
          error={errors?.name}
          label={t("nameLabel")}
          {...register("name")}
        />
        <InputField
          type="email"
          placeholder="aspen@enterprise.com"
          error={errors?.email}
          label={t("emailLabel")}
          {...register("email")}
        />
        <TextareaField
          rows={9}
          placeholder="Hello Marco,"
          error={errors?.message}
          label={t("messageLabel")}
          {...register("message")}
        />
        <StatusButton
          type="submit"
          status={emailStatus}
          defaultText="Send"
          pendingText="Sending"
          successText="Sent"
          failureText="Retry"
          aria-label="Submit contact form"
        />
      </form>
    </section>
  );
}
