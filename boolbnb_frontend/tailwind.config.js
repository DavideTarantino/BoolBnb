/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      'sm': '550px',
      'md': '745px',
      'lg': '950px',
      'xl': '1127px',
    },
  },
  plugins: [],
}

