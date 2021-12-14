import Link from "next/link";

const BlogHeader = () => {
  return (
    <header className="w-full z-50 bg-primary py-2 px-4 flex flex-row justify-between space-x-8 sm:space-x-6 md:space-x-7 lg:space-x-14">
      <Link href="/articles" passHref>
        <a className="flex flex-row text-white p-2">
          Marco Tom&aacute;s Rodr&iacute;guez
        </a>
      </Link>
    </header>
  );
};

export default BlogHeader;
