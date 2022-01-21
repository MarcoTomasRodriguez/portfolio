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
import matter from "gray-matter";
import { EmailInformation, sendEmail } from "@libs/mailer";
import { Project } from "@typeDefs/project";
import { Experience } from "@typeDefs/experience";
import { Article } from "@typeDefs/article";
import Layout from "@components/Layout";
import Typewriter from "@components/Typewriter";
import Input from "@components/Input";
import Card from "@components/Card";
import Badge from "@components/Badge";
import StatusButton, { Status } from "@components/StatusButton";

type HomeProps = {
  experience: Experience[];
  projects: Project[];
  articles: Article[];
  languages: {
    language: string;
    level: string;
  }[];
};

const Home = ({ experience, projects, articles, languages }: HomeProps) => {
  const { t } = useTranslation("index");

  const [displayProfession, setDisplayProfession] = useState(false);
  const [emailStatus, setEmailStatus] = useState<Status>(Status.NONE);

  useEffect(() => {
    const timeToPrintIntroduction = t("about.introduction").length * 60;
    setTimeout(() => setDisplayProfession(true), timeToPrintIntroduction + 100);
  }, [t]);

  const { control, handleSubmit } = useForm<EmailInformation>({
    defaultValues: { email: "", name: "", message: "" },
  });

  const submitEmailForm = (data: EmailInformation) => {
    setEmailStatus(Status.PENDING);

    sendEmail(data)
      .then(() => setEmailStatus(Status.SUCCESS))
      .catch(() => setEmailStatus(Status.FAILURE));
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
          text={t("about.introduction")}
        />
        {displayProfession && (
          <Typewriter className="text-xl" text={t("about.profession")} />
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
          <h1 className="mb-7 text-xl font-bold">{t("experience.title")}</h1>
          <div className="flex flex-col space-y-6">
            {experience.map((experience, index) => (
              <Card key={index}>
                <div className="flex flex-row space-x-4">
                  <div className="relative w-14 h-14 my-1">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                      src={experience.logo || "/img/default-company.png"}
                      alt={`${experience.company} logo`}
                    />
                  </div>
                  <div>
                    <h1 className="font-bold">{experience.title}</h1>
                    <p className="text-sm">{experience.company}</p>
                    <p className="text-sm opacity-80">{experience.years}</p>
                  </div>
                </div>
                <ul className="mt-2 list-disc list-inside text-sm">
                  {experience.points?.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <div className="flex flex-row flex-wrap mt-1">
                  {experience.badges.map((badge, index) => (
                    <Badge key={index} text={badge.text} color={badge.color} />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>
        <section id="projects" className="w-full h-full py-12">
          <h1 className="mb-7 text-xl font-bold">{t("projects.title")}</h1>
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
        <section id="languages" className="w-full h-full py-12">
          <h1 className="mb-7 text-xl font-bold">{t("languages.title")}</h1>
          <div className="flex flex-col space-y-6">
            {languages.map((language, index) => (
              <Card key={index}>
                <Card.Title>{language.language}</Card.Title>
                <Card.Content>{language.level}</Card.Content>
              </Card>
            ))}
          </div>
        </section>
        <section id="articles" className="w-full h-full py-12">
          <h1 className="mb-7 text-xl font-bold"> {t("articles.title")}</h1>
          <div className="flex flex-col space-y-6">
            {articles.map((article, index) => (
              <Link
                key={index}
                href={`/articles/${article.slug}`}
                locale={false}
                passHref
              >
                <Card className="cursor-pointer">
                  <Card.Title>{article.meta.title}</Card.Title>
                  <Card.Content>
                    <p className="line-clamp-3">{article.meta.abstract}</p>
                    <p className="mt-2">{article.meta.date}</p>
                  </Card.Content>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        <section id="contact" className="w-full h-full py-12 grid grid-cols-5">
          <div className="h-full p-8 col-span-5 md:col-span-3 flex flex-col space-y-8 justify-center">
            <h1 className="text-xl font-bold text-center">
              {t("contact.title")}
            </h1>
            <p className="text-center text-sm text-opacity-90">
              {t("contact.body")}
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
              label={t("contact.nameLabel")}
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
              label={t("contact.emailLabel")}
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
              label={t("contact.messageLabel")}
              placeholder="Hello Marco,"
              control={control}
              rules={{
                minLength: { value: 2, message: "Minimum length is 2" },
                maxLength: { value: 2048, message: "Maximum length is 2048" },
                required: { value: true, message: "Required" },
              }}
            />
            <StatusButton status={emailStatus} />
          </form>
        </section>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  const localesDirectory = path.join(process.cwd(), `public/locales/${locale}`);
  // const translations = await serverSideTranslations(locale, ["index"]);

  const translations = JSON.parse(
    fs.readFileSync(path.join(localesDirectory, "index.json"), "utf-8")
  );

  const files = fs.readdirSync("public/articles");
  const articles = files.map((filename) => ({
    meta: matter(
      fs.readFileSync(path.join("public/articles", filename), "utf-8")
    ).data,
    slug: filename.split(".")[0],
  }));

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "index"])),
      experience: translations.experience.content || [],
      projects: translations.projects.content || [],
      languages: translations.languages.content || [],
      articles,
    },
  };
};

export default Home;
