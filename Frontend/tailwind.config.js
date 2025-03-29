/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-750': '#2d2d2d',
      },
      boxShadow: {
        'red-glow': '0 0 15px rgba(220,38,38,0.1)',
      },
    },
  },
  plugins: [],
};