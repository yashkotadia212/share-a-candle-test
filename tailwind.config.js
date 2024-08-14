/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    fontFamily: {
      jua: ["Jua", "sans-serif"],
    },
    extend: {
      screens: {
        xs: '320px', // Add the xs breakpoint
      },
    },
  },
  plugins: [],
}

