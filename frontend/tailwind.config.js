/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'nav':'#00ADB5',
        'post':'#EEEEEE',
        'side':'#393E46',
        'font_c':'#222831',
      }
    },
  },
  plugins: [],
}