export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables toggle feature for Bonus marks
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geograph', '"Helvetica Neue"', 'Inter', 'Arial', 'sans-serif'],
      },
      colors: {
        'brand-blue': '#1a1f2b',
        'brand-red': '#e31b23',
        'offwhite': '#f5f4f0',
        'charcoal': '#212a2f'
      },
    },
  },
  plugins: [],
}
