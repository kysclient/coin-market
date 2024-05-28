/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        spoqaHanSansNeo: ["SpoqaHanSansNeo", "sans-serif"],
      },
      animation: {
        "fade-in": "fade-in 1s ease-in-out forwards",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0%",
          },
          "75%": {
            opacity: "0%",
          },
          "100%": {
            opacity: "100%",
          },
        },
      },
    },
  },
  plugins: [],
};
