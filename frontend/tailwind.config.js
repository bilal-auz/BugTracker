/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        s_black: "#191414",
      },
    },
  },
  plugins: [require("daisyui")],
};
