import { ReactNode } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const PortfolioHeader = dynamic(() => import("./PortfolioHeader"));
const BlogHeader = dynamic(() => import("./BlogHeader"));

type LayoutProps = {
  title: string;
  description: string;
  site: "portfolio" | "blog";
  children: ReactNode;
};

const Layout = ({ title, description, site, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      {site == "portfolio" && <PortfolioHeader />}
      {site == "blog" && <BlogHeader />}
      {children}
    </>
  );
};

export default Layout;
