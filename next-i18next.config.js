const { initReactI18next } = require("react-i18next");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "es"],
    returnObjects: true,
  },
  serializeConfig: false,
  use: [initReactI18next],
};
