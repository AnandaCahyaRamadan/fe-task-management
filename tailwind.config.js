module.exports = {
  purge: [
    './index.html',
    './src/**/*.vue',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: "#00A884",
        secondary: "#007F66",
        accent: "#36D399",
        background: "#F3FDF9",
        surface: "#FFFFFF",
        text: "#1F2A37",
      },
      keyframes: {
        "fade-slide": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-slide": "fade-slide 0.5s ease-out forwards",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
