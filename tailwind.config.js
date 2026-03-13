export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'Geograph', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['"Playfair Display"', '"Self Modern"', 'Georgia', 'serif'],
        mono: ['"DM Mono"', '"Akkurat Mono"', 'monospace'],
      },
      colors: {
        'brand-blue': '#1a1f2b',
        'brand-red': '#e31b23',
        'offwhite': '#f5f5f0',
        'natural-white': '#f5f5f0',
        'charcoal': '#212121',
        'light-charcoal': '#767676',
      },
      borderRadius: {
        'card': '0.75rem',
      },
      letterSpacing: {
        'wide-brand': '0.1em',
        'wider-brand': '0.15em',
      },
    },
  },
  plugins: [],
}
