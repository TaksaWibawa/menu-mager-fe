import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },

    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#34bc85',
        'primary-hover': '#2c9f6d',
      },
      backgroundColor: {
        sidebar: '#f0f8f7',
      },
    },
  },
  plugins: ['@tailwindcss/typography', daisyui],
  daisyui: {
    themes: ['fantasy'],
  },
};
