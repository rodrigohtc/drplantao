module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50', // Verde
        'primary-dark': '#388E3C',
        'primary-light': '#C8E6C9',
      },
    },
  },
  plugins: [],
};
