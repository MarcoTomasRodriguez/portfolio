module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#3f51b5",
      },
      animation: {
        blink: "blink 400ms linear infinite alternate",
      },
      keyframes: {
        blink: {
          "0%": { opacity: 0 },
          "50%": { opacity: 1 },
        },
      },
    },
    fontFamily: {
      sans: ["Roboto", "system-ui"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
