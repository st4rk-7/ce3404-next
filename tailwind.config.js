export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables toggle feature for Bonus marks
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Anonymous Pro"', 'monospace'],
      },
      colors: {
        'brand-blue': '#232C65',
        'brand-red': '#BD161C',
      }
    },
  },
  plugins: [],
}
