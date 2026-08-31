/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-beige': {
          DEFAULT: '#EDE6DC',
          50:  '#F8F5F0',
          100: '#F3EFE8',
          200: '#EDE6DC',
          300: '#DDD3C4',
          400: '#CFC1AD',
          500: '#BBA992',
        },
        'paper-cream': {
          DEFAULT: '#F5F1EB',
          light: '#FAF8F4',
          dark: '#E8E1D6',
        },
        'deep-navy': {
          DEFAULT: '#0F1A29',
          50:  '#EEF3F8',
          100: '#D0DDE9',
          600: '#1E3248',
          800: '#132032',
          900: '#0F1A29',
          950: '#070D16',
        },
        'soft-gold': {
          DEFAULT: '#C59B4E',
          100: '#FBF4E3',
          200: '#F3E2B8',
          300: '#E5C97C',
          400: '#D4B060',
          500: '#C59B4E',
          600: '#A47D34',
          700: '#7A5D1E',
        },
        'botanical-sage': {
          DEFAULT: '#7A8B7B',
          light: '#ECF2EB',
          medium: '#A2B3A3',
          dark: '#4E6250',
        },
        'muted-rose': {
          DEFAULT: '#C48377',
          100: '#F9EDE9',
          400: '#D49A8C',
          500: '#C48377',
          600: '#9E5F54',
        }
      },
      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'editorial':        '0 8px 30px -8px rgba(15,26,41,0.08)',
        'editorial-hover':  '0 24px 50px -10px rgba(15,26,41,0.16)',
        'card-warm':        '0 6px 24px -4px rgba(122,139,123,0.12)',
        'glow-gold':        '0 0 24px rgba(197,155,78,0.25), 0 0 48px rgba(197,155,78,0.1)',
        'glow-rose':        '0 0 20px rgba(196,131,119,0.2)',
        'inner-warm':       'inset 0 2px 6px rgba(15,26,41,0.06)',
      },
      animation: {
        'float-slow':    'float 9s ease-in-out infinite',
        'spin-slow':     'spin 28s linear infinite',
        'pulse-subtle':  'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow':    'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sway':          'sway 7s ease-in-out infinite',
        'fade-up':       'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'glow-pulse':    'glowPulse 3s ease-in-out infinite',
        'ambient-float': 'ambientFloat 9s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-14px) rotate(3deg)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%':      { transform: 'rotate(5deg)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-warm': 'radial-gradient(rgba(197,155,78,0.12) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-28': '28px 28px',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
        '108': '1.08',
      },
    },
  },
  plugins: [],
}
