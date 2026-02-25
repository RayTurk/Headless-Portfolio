import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep charcoal — page & card backgrounds
        ember: {
          950: '#0b0804',  // page bg
          900: '#160f08',  // cards
          800: '#221708',  // elevated surface
          700: '#2e2010',  // borders
          600: '#4a3520',  // muted borders
        },
        // Aged gold — primary accent
        gold: {
          300: '#e8d08a',
          400: '#d4b45a',  // hover
          500: '#c9a84c',  // primary
          600: '#a88830',
          700: '#7a6020',
        },
        // Merlot — secondary accent
        merlot: {
          400: '#b85a6a',
          500: '#8e2a38',  // primary merlot
          600: '#6e1e28',
          700: '#4e1318',
        },
        // Warm cream — text
        cream: '#f5ede0',
        // Stone — secondary text
        stone: '#a89880',
        // Parchment — soft surface
        parchment: {
          800: '#3a2e1e',
          900: '#241a0e',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-gold': '0 0 30px rgba(201, 168, 76, 0.15)',
        'card': '0 1px 3px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.7s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
