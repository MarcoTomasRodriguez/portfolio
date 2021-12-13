import fs from "fs";
import path from "path";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ArrowDownIcon, MailIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import { EmailInformation, sendEmail } from "@libs/mailer";
import { Project } from "@typeDefs/project";
import { Experience } from "@typeDefs/experience";
import Layout from "@components/Layout";
import ExperienceCard from "@components/ExperienceCard";
import Typewriter from "@components/Typewriter";
import StatusButton, { RequestStatus } from "@components/StatusButton";
import Input from "@components/Input";
import Card from "@components/Card";
import Badge from "@components/Badge";

type HomeProps = {
  experience: Experience[];
  projects: Project[];
};

const Home = ({ experience, projects }: HomeProps) => {
  const { t: aboutT } = useTranslation("about");
  const { t: experienceT } = useTranslation("experience");
  const { t: projectsT } = useTranslation("projects");
  const { t: contactT } = useTranslation("contact");

  const [displayProfession, setDisplayProfession] = useState(false);
  const [emailStatus, setEmailStatus] = useState(RequestStatus.None);

  useEffect(() => {
    const timeToPrintIntroduction = aboutT("introduction").length * 60;
    setTimeout(() => setDisplayProfession(true), timeToPrintIntroduction + 100);
  }, [aboutT]);

  const { control, handleSubmit } = useForm<EmailInformation>({
    defaultValues: { email: "", name: "", message: "" },
  });

  const submitEmailForm = (data: EmailInformation) => {
    setEmailStatus(RequestStatus.Pending);

    sendEmail(data)
      .then(() => setEmailStatus(RequestStatus.Success))
      .catch(() => setEmailStatus(RequestStatus.Failure));
  };

  return (
    <Layout
      site="portfolio"
      title="Marco Tom&aacute;s Rodr&iacute;guez"
      description="Portfolio of Marco Tomas Rodriguez"
    >
      <section
        id="about"
        className="relative min-w-screen min-h-screen grid place-content-center bg-primary text-white text-center p-6 space-y-8"
      >
        <Typewriter
          className="text-2xl font-bold"
          text={aboutT("introduction")}
        />
        {displayProfession && (
          <Typewriter className="text-xl" text={aboutT("profession")} />
        )}
        <a
          href="#experience"
          className="absolute w-6 h-6 left-1/2 right-1/2 bottom-10 -ml-3 animate-bounce"
          aria-label="Scroll to experience"
        >
          <ArrowDownIcon />
        </a>
      </section>
      <div className="divide-solid divide-y-2 px-6 md:px-8 lg:px-12 ">
        <section id="experience" className="w-full h-full py-12">
          <h1 className="mb-7 text-xl font-bold">{experienceT("title")}</h1>
          <div className="flex flex-col space-y-6">
            {experience.map((experience, index) => (
              <ExperienceCard {...experience} key={index} />
            ))}
          </div>
        </section>
        <section id="projects" className="w-full h-full py-12">
          <h1 className="mb-7 text-xl font-bold">{projectsT("title")}</h1>
          <div className="flex flex-col space-y-6">
            {projects.map((project, index) => (
              <Card key={index}>
                <Card.Title>{project.title}</Card.Title>
                <Card.Content>
                  {project.description}
                  {project.badges && (
                    <div className="flex flex-row flex-wrap mt-1">
                      {project.badges.map((badge, index) => (
                        <Badge
                          key={index}
                          text={badge.text}
                          color={badge.color}
                        />
                      ))}
                    </div>
                  )}
                </Card.Content>
                {(project.websiteUrl || project.repositoryUrl) && (
                  <Card.Actions>
                    {project.websiteUrl && (
                      <Link href={project.websiteUrl} passHref={true}>
                        Website
                      </Link>
                    )}
                    {project.repositoryUrl && (
                      <Link href={project.repositoryUrl} passHref={true}>
                        Repository
                      </Link>
                    )}
                  </Card.Actions>
                )}
              </Card>
            ))}
          </div>
        </section>
        <section id="contact" className="w-full h-full py-12 grid grid-cols-5">
          <div className="h-full p-8 col-span-5 md:col-span-3 flex flex-col space-y-8 justify-center">
            <h1 className="text-xl font-bold text-center">
              {contactT("title")}
            </h1>
            <p className="text-center text-sm text-opacity-90">
              {contactT("body")}
            </p>
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
                <Image
                  src="/svg/github.svg"
                  alt="github"
                  width="24"
                  height="24"
                />
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
          <form
            onSubmit={handleSubmit(submitEmailForm)}
            className="flex flex-col p-4 col-span-5 md:col-span-2 space-y-6"
          >
            <Input
              component="input"
              name="name"
              type="text"
              required
              className="w-full"
              label={contactT("nameLabel")}
              placeholder="Aspen Collins"
              control={control}
              rules={{
                minLength: { value: 2, message: "Minimum length is 2" },
                maxLength: { value: 64, message: "Maximum length is 64" },
                required: { value: true, message: "Required" },
              }}
            />
            <Input
              component="input"
              name="email"
              type="email"
              required
              className="w-full"
              label={contactT("emailLabel")}
              placeholder="aspen@enterprise.com"
              control={control}
              rules={{
                required: { value: true, message: "Required" },
              }}
            />
            <Input
              component="textarea"
              name="message"
              required
              rows={9}
              className="w-full"
              label={contactT("messageLabel")}
              placeholder="Hello Marco,"
              control={control}
              rules={{
                minLength: { value: 2, message: "Minimum length is 2" },
                maxLength: { value: 2048, message: "Maximum length is 2048" },
                required: { value: true, message: "Required" },
              }}
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
