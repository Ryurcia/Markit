import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    fontSize: {
      sm: '13px',
      base: '16px',
      xl: '20px',
      sub: '25px',
      h3: '31px',
      h2: '39px',
      h1: '49px',
    },
    borderRadius: {
      DEFAULT: '6px',
    },
    colors: {
      primary: '#27AE60',
      secondary: '#2ECC71',
      neutral: '#F5F5F5',
      accent1: '#F1C40F',
      accent2: '#E74C3C',
      dark: '#424242',
      dark2: '#17191c',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'green-dream': {
          '0%': {
            background: 'linear-gradient(-45deg, #2ECC71, #F1C40F, #2ECC71, #2ECC71)',
            backgroundSize: '200% 200%',
            backgroundPosition: '0% 100%',
          },
          '50%': {
            background: 'linear-gradient(-45deg,  #2ECC71, #F1C40F, #2ECC71, #2ECC71)',
            backgroundSize: '200% 200%',
            backgroundPosition: '100% 0%',
          },
          '100%': {
            background: 'linear-gradient(-45deg,  #2ECC71, #F1C40F, #2ECC71, #2ECC71)',
            backgroundSize: '200% 200%',
            backgroundPosition: '0% 100%',
          },
        },
        'gray-fluff': {
          '0%': {
            'background-size': '100% 100%',
            'background-position': 'left top',
            'background-image': 'linear-gradient(to bottom right, rgba(23, 25, 28, 0.8), rgba(0, 0, 0, 0.8))',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right bottom',
            'background-image': 'linear-gradient(to bottom right, rgba(23, 25, 28, 0.8), rgba(0, 0, 0, 0.8))',
          },
          '100%': {
            'background-size': '100% 100%',
            'background-position': 'left top',
            'background-image': 'linear-gradient(to bottom right, rgba(23, 25, 28, 0.8), rgba(0, 0, 0, 0.8))',
          },
        },
        'diagonal-green-wave': {
          '0%': {
            'background-size': '200% 200%',
            'background-position': 'top left',
            'background-image': 'linear-gradient(to bottom right, rgba(46, 204, 113, 0.8), rgba(32, 178, 170, 0.8))',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'bottom right',
            'background-image': 'linear-gradient(to bottom right, rgba(32, 178, 170, 0.8), rgba(46, 204, 113, 0.8))',
          },
          '100%': {
            'background-size': '200% 200%',
            'background-position': 'top left',
            'background-image': 'linear-gradient(to bottom right, rgba(46, 204, 113, 0.8), rgba(32, 178, 170, 0.8))',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'green-dream': 'green-dream 8s ease infinite',
        'gray-fluff': 'gray-fluff 8s ease infinite',
        'diagonal-green-wave': 'diagonal-green-wave 8s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
