/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"'],
        cursive: ["Caveat"],
      },
      colors: {
        // mud: "#386641",
        mud: "#AA5636",
        dark: "#333333",
        // pig: "#cd1624",
        pig: "#FF8FB1",
        // grass: "#f2e8cf",
        grass: "#386641",
        extra: "#eca827",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
