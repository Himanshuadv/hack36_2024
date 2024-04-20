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
        'side':'#9DB2BF',
        'font_c':'#222831',
        'btn':'#512da8',
        'tog':'#512da8',
      }
    },
  },
  plugins: [],
}