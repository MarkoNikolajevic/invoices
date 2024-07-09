import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      white: '#fff',
      purple: {
        400: '#9277ff',
        500: '#7c5dfa'
      },
      red: {
        400: '#ff9797',
        500: '#ec5757'
      },
      grey: {
        100: '#f9fafe',
        200: '#f8f8fb',
        300: '#dfe3fa',
        400: '#7e88c3',
        500: '#888eb0',
        600: '#494e6e'
      },
      blue: {
        600: '#252945',
        700: '#141625',
        800: '#1e2139',
        900: '#0c0e16'
      }
    },
    extend: {}
  },
  plugins: [],
};
export default config;
