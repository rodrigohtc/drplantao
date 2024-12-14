/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        primary: '#4CAF50', // Verde
        'primary-dark': '#388E3C',
        'primary-light': '#C8E6C9',
      },
      textWrap: {
        balance: 'balance',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Plugins úteis, remova se não precisar
    require('@tailwindcss/typography'),
  ],
};
