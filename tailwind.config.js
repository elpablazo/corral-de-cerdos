/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"'],
        cursive: ["Caveat"],
      },
      colors: {
        mud: "#AA5636",
        dark: "#333333",
        pig: "#FF8FB1",
        grass: "#05946E",
      },
    },
  },
  plugins: [],
};
