/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
  'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
  'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      'sm': '550px',
      'md': '745px',
      'lg': '950px',
      'xl': '1127px',
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

