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
        // Warm cream — page & surface backgrounds
        parchment: {
          50: '#fdfaf7',   // page bg
          100: '#faf3ec',  // off-white sections
          200: '#f5e9da',  // subtle surface
          300: '#ecd6c0',
          400: '#d9b99a',
          500: '#c49a74',
        },
        // Blush rose — primary brand accent
        blush: {
          50: '#fdf4f0',
          100: '#fae6de',
          200: '#f5cdc0',
          300: '#eba897',
          400: '#df8070',  // soft rose
          500: '#c9604e',  // primary CTA
          600: '#b04438',
          700: '#8e3228',
          800: '#6e2420',
          900: '#4f1a18',
        },
        // Warm gold — secondary accent
        gold: {
          300: '#dfc48a',
          400: '#cda95c',
          500: '#b8900a',  // primary gold
          600: '#9a7808',
        },
        // Deep bark — primary text
        bark: '#2d1f1a',
        // Medium drift — secondary text
        drift: '#7a5c52',
        // Light sage — tertiary / dividers
        sage: {
          100: '#f0ede8',
          200: '#e0d9d2',
          400: '#a09488',
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
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(45, 31, 26, 0.08)',
        'card': '0 1px 4px rgba(45, 31, 26, 0.06), 0 4px 16px rgba(45, 31, 26, 0.06)',
        'card-hover': '0 8px 32px rgba(45, 31, 26, 0.12)',
        'blush-glow': '0 0 30px rgba(201, 96, 78, 0.15)',
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
