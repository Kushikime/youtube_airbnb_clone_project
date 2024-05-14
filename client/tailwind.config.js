/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#F5385D",
          700: "#db2e50",
        },
      },
    },
  },
  plugins: [],
};
