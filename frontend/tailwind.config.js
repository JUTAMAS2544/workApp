/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  important: true,
  prefix: 'tw-',
  theme: {
    fontFamily: {
      'sans': ['Prompt'],
    },
    extend: {},
  },
  attributify: true,
  plugins: [],
}