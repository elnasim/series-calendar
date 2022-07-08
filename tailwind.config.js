/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "color-1": "#22223b",
      "color-2": "#4a4e69",
      "color-3": "#9a8c98",
      "color-4": "#c9ada7",
      "color-5": "#f2e9e4",
      red: "#fd3d11",
    },
    fontFamily: {
      body: ['"Open Sans"', "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
