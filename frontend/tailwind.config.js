/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FDFAF5",
        card: "#FFF8EE",
        section: "#F0E6D3",
        ink: "#3E2F1C",
        "ink-secondary": "#7A6652",
        "ink-dark": "#2B2114",
        brown: "#A67B5B",
        "brown-deep": "#8C5A3C",
        "brown-gold": "#C2A878",
        rose: "#C08081",
        "rose-light": "#E8C4C4",
        sage: "#A3B18A",
        mustard: "#D4A373",
        "faded-blue": "#7C96AB",
        lavender: "#B8A1C9",
      },
      fontFamily: {
        heading: ["Texturina", "serif"],
        body: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
}