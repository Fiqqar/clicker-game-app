/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: '#2C2F33'
      },
      fontSize: {
        'xxs': '0.5rem'
      }
    },
  },
  plugins: [],
}

