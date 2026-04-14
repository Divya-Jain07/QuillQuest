/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F5E6CC",
        card: "#EAD7B7",
        section: "#DFCCAA",
        ink: "#3E2F1C",
        "ink-secondary": "#6B5B3E",
        "ink-dark": "#2B2114",
        brown: "#A67B5B",
        "brown-deep": "#8C5A3C",
        "brown-gold": "#C2A878",
        rose: "#C08081",
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