import { useEffect } from "react";
import { hotjar } from 'react-hotjar';
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../../next-i18next.config.js";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    hotjar.initialize(2490551, 6);
  }, []);

  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp, nextI18NextConfig);
