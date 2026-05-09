/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        zomato: '0 18px 55px rgba(255, 209, 102, 0.16)',
      },
    },
  },
  plugins: [],
};

