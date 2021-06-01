import Link from "next/link";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "../../components/Header";

export default function Articles() {
  const articles = [];

  return (
    <>
      <Header />
      <div className="p-6 space-y-7">
        <p className="text-xl font-bold">Articles</p>
        <div className="grid grid-cols-6 gap-5 justify-center">
          {articles &&
            articles.map((index) => (
              <Link key={index} href="/">
                <div className="flex flex-grow col-span-6 lg:col-span-3 shadow rounded cursor-pointer">
                  <div className="p-4">
                    <p className="text-xs font-bold">Justin Pacquing</p>
                    <p className="text-lg font-extrabold line-clamp-1">
                      Orientalism for Asian America
                    </p>
                    <p className="text-sm text-gray-800 line-clamp-1 md:line-clamp-2">
                      Understanding the Asian American experience, including
                      #StopAsianHate, is predicated on understanding how
                    </p>
                    <p className="text-xs text-gray-800 leading-loose">
                      May 19 - 7 min read
                    </p>
                  </div>
                  <div className="relative w-[400px]">
                    <Image
                      layout="fill"
                      objectFit="fill"
                      className="rounded-r"
                      src="https://miro.medium.com/fit/c/250/168/1*h3I-PLw9YxY9MmWU4UksCA.jpeg"
                    />
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["header"])),
    },
  };
}
