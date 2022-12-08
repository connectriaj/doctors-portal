/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        doctorsTheme: {
          primary: "#0FCFEC",

          secondary: "#19D3AE",

          accent: "#3A4256",

          neutral: "#171E26",

          "base-100": "#F8F6F9",

          info: "#45A9D3",

          success: "#34E598",

          warning: "#AB7B03",

          error: "#E12D54",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
