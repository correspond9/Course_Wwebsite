/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stepby: {
          blue: '#0052FF',
          darkBlue: '#003eb3',
          lightBlue: '#E5EDFF'
        }
      }
    },
  },
  plugins: [],
}