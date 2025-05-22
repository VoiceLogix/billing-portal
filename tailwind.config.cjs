/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // your components
    "./src/**/*.{css}", // your styles.css with @apply
  ],
  theme: {
    extend: {
      colors: {
        "text-black": "#000000",
        "text-blue": "#6B7280",
        border: "#DDDDDD",
      },
    },
  },
  plugins: [],
};
