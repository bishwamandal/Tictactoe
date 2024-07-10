/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '0.5em': '0.5em',
        '1em':  '1em',
      },
      fontSize: {
        '2.5em': '2.5rem',
      },
      colors: {
        'coiny-red': '#ee5a5a',
      },
    },
  },
  plugins: [],
}