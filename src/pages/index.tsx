import fs from "fs";
import path from "path";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ArrowDownIcon, MailIcon } from "@heroicons/react/outline";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { sendEmail } from "@libs/mailer";
import Layout from "@components/Layout";
import Section from "@components/Section";
import ProjectCard from "@components/ProjectCard";
import ExperienceCard from "@components/ExperienceCard";
import Typewriter from "@components/Typewriter";
import StatusButton, { RequestStatus } from "@components/StatusButton";
import Input from "@components/Input";
import Textarea from "@components/Textarea";
import { Project } from "@typeDefs/project";
import { Experience } from "@typeDefs/experience";

type EmailForm = {
  name: string;
  email: string;
  message: string;
};

const EmailSchema = Yup.object().shape({
  name: Yup.string().min(2).max(64).required(),
  email: Yup.string().email().required(),
  message: Yup.string().min(2).max(2048).required(),
});

const AboutSection = () => {
  const { t } = useTranslation("about");
  const [displayProfession, setDisplayProfession] = useState(false);

  useEffect(() => {
    const timeToPrintIntroduction = t("introduction").length * 60;
    setTimeout(() => setDisplayProfession(true), timeToPrintIntroduction + 100);
  }, [t]);

  return (
    <section
      id="about"
      className="relative min-w-screen min-h-screen grid place-content-center bg-primary text-white text-center p-6 space-y-8"
    >
      <Typewriter className="text-2xl font-bold">
        {t("introduction")}
      </Typewriter>
      {displayProfession && (
        <Typewriter className="text-xl">{t("profession")}</Typewriter>
      )}
      <a
        href="#experiences"
        className="absolute w-6 h-6 left-1/2 right-1/2 bottom-10 -ml-3 animate-bounce"
        aria-label="Scroll to experience"
      >
        <ArrowDownIcon />
      </a>
    </section>
  );
};

const ExperienceSection = ({ experience }: { experience: Experience[] }) => {
  const { t } = useTranslation("experience");

  return (
    <Section id="experiences" title={t("title")}>
      <div className="flex flex-col space-y-6">
        {experience &&
          experience.map((experience, index) => (
            <ExperienceCard {...experience} key={index} />
          ))}
      </div>
    </Section>
  );
};

const ProjectSection = ({ projects }: { projects: Project[] }) => {
  const { t } = useTranslation("projects");

  return (
    <Section id="projects" title={t("title")}>
      <div className="flex flex-col space-y-6">
        {projects &&
          projects.map((project, index) => (
            <ProjectCard {...project} key={index} />
          ))}
      </div>
    </Section>
  );
};

const ContactSection = () => {
  const { t } = useTranslation("contact");
  const [emailStatus, setEmailStatus] = useState(RequestStatus.None);

  const submitEmailForm = (data: EmailForm) => {
    setEmailStatus(RequestStatus.Pending);

    sendEmail(data)
      .then(() => setEmailStatus(RequestStatus.Success))
      .catch(() => setEmailStatus(RequestStatus.Failure));
  };

  return (
    <section id="contact" className="w-full h-full py-12 grid grid-cols-5">
      <div className="h-full p-8 col-span-5 md:col-span-3 flex flex-col space-y-8 justify-center">
        <h1 className="text-xl font-bold text-center">{t("title")}</h1>
        <p className="text-center text-sm text-opacity-90">{t("body")}</p>
        <div className="flex flex-row space-x-7 justify-center">
          <a
            className="w-6 h-6"
            href="mailto:marcotomasrodriguez@gmail.com"
            aria-label="Send email"
          >
            <MailIcon />
          </a>
          <a
            className="w-6 h-6"
            href="https://github.com/MarcoTomasRodriguez"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit GitHub profile"
          >
            <Image src="/svg/github.svg" alt="github" width="24" height="24" />
          </a>
          <a
            className="w-6 h-6"
            href="https://www.linkedin.com/in/marcotomasrodriguez"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit LinkedIn profile"
          >
            <Image
              src="/svg/linkedin.svg"
              alt="github"
              width="24"
              height="24"
            />
          </a>
        </div>
      </div>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={EmailSchema}
        onSubmit={submitEmailForm}
      >
        <Form className="flex flex-col p-4 col-span-5 md:col-span-2 space-y-6">
          <Field
            name="name"
            type="text"
            className="w-full"
            label={t("nameLabel")}
            placeholder="Aspen Collins"
            component={Input}
          />
          <Field
            name="email"
            type="email"
            className="w-full"
            label={t("emailLabel")}
            placeholder="aspen@enterprise.com"
            component={Input}
          />
          <Field
            name="message"
            rows={9}
            className="w-full"
            label={t("messageLabel")}
            placeholder="Hello Marco,"
            component={Textarea}
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
        </Form>
      </Formik>
    </section>
  );
};

const Home = ({
  experience,
  projects,
}: {
  experience: Experience[];
  projects: Project[];
}) => {
  return (
    <Layout
      site="portfolio"
      title="Marco Tom&aacute;s Rodr&iacute;guez"
      description="Portfolio of Marco Tomas Rodriguez"
    >
      <AboutSection />
      <div className="divide-solid divide-y-2 px-6 md:px-8 lg:px-12 ">
        <ExperienceSection experience={experience} />
        <ProjectSection projects={projects} />
        <ContactSection />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  const localesDirectory = path.join(process.cwd(), `public/locales/${locale}`);

  const translations = await serverSideTranslations(locale, [
    "about",
    "contact",
    "experience",
    "header",
    "projects",
  ]);

  const experiencePath = path.join(localesDirectory, "experience-content.json");
  const experience = fs.existsSync(experiencePath)
    ? JSON.parse(fs.readFileSync(experiencePath, "utf-8"))
    : [];

  const projectsPath = path.join(localesDirectory, "projects-content.json");
  const projects = fs.existsSync(projectsPath)
    ? JSON.parse(fs.readFileSync(projectsPath, "utf-8"))
    : [];

  return {
    props: {
      ...translations,
      experience,
      projects,
    },
  };
};

export default Home;
