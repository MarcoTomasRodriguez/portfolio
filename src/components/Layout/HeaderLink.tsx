import Link from "next/link";
import { ComponentProps, ComponentType } from "react";

type HeaderLinkProps = {
  title: string;
  url: string;
  Icon: ComponentType<ComponentProps<"svg">>;
};

const HeaderLink = ({ title, url, Icon }: HeaderLinkProps) => {
  return (
    <Link href={url} passHref aria-label={`Scroll to ${title}`}>
      <button className="flex flex-row text-sm text-white p-2 rounded hover:bg-black hover:bg-opacity-10">
        <Icon
          className="visible sm:invisible h-5 w-5 sm:h-0 sm:w-0"
          viewBox="0 0 20 20"
        />
        <span className="invisible sm:visible h-0 w-0 sm:h-auto sm:w-auto">
          {title}
        </span>
      </button>
    </Link>
  );
};

export default HeaderLink;
