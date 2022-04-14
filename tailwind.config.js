module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xxs: [
        '0.6875rem',
        {
          letterSpacing: '-0.23px',
          lineHeight: '1.125rem'
        }
      ],
      xs: [
        '0.75rem',
        {
          letterSpacing: '-0.25px',
          lineHeight: '1rem'
        }
      ],
      base: [
        '1rem',
        {
          letterSpacing: '-0.8px',
          lineHeight: '1.5rem'
        }
      ],
      xl: [
        '1.25rem',
        {
          letterSpacing: '-0.63px',
          lineHeight: '1.375rem'
        }
      ],
      '3xl': [
        '2rem',
        {
          letterSpacing: '-1px',
          lineHeight: '2.25rem'
        }
      ]
    },
    extend: {
      colors: {
        purple: {
          400: '#9277ff',
          500: '#7c5dfa'
        },
        red: {
          400: '#ff9797',
          500: '#ec5757'
        },
        gray: {
          100: '#f9fafe',
          200: '#f8f8fb',
          300: '#dfe3fa',
          400: '#7e88c3',
          500: '#888eb0',
          600: '#494e6e',
          shadow: 'rgba(72, 84, 159, 0.1)'
        },
        blue: {
          600: '#252945',
          700: '#141625',
          800: '#1e2139',
          900: '#0c0e16'
        },
        status: {
          paid: '#33d69f',
          pending: '#ff8f00',
          draft: '#dfe3fa'
        }
      },
      spacing: {
        18: '4.5rem'
      },
      boxShadow: {
        'dropdown-light': '0px 10px 20px rgba(72, 84, 159, 0.25)',
        'dropdown-dark': '0px 10px 20px rgba(0, 0, 0, 0.25)',
        invoice: '0px 10px 10px -10px rgba(72, 84, 159, 0.10)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
