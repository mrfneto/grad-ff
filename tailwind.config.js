/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      primary: colors.indigo,
      danger: colors.red,
      success: colors.green
    },
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
}
