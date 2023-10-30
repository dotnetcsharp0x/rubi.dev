/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      background: {
        'hero-pattern': "url('./logo512.png)",
      }
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
],
}