const { shadcnPlugin } = require('./src/lib/shadcn-plugin')
const animatePlugin = require("tailwindcss-animate")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  plugins: [animatePlugin, shadcnPlugin],
}