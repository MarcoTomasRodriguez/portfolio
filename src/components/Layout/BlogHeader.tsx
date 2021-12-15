import Link from "next/link";
import { BriefcaseIcon, NewspaperIcon } from "@heroicons/react/solid";
import HeaderLink from "./HeaderLink";

const BlogHeader = () => {
  return (
    <header className="w-full z-50 bg-primary py-2 px-4 flex flex-row justify-between">
      <Link href="/articles" passHref>
        <a className="flex flex-row text-white p-2">
          Marco Tom&aacute;s Rodr&iacute;guez
        </a>
      </Link>
      <div className="flex">
        <HeaderLink title="Articles" url="/articles" Icon={NewspaperIcon} />
        <HeaderLink title="Portfolio" url="/" Icon={BriefcaseIcon} />
      </div>
    </header>
  );
};

export default BlogHeader;
