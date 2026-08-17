/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        civic: {
          saffron:    { DEFAULT: '#E85D26', 50: '#FFF3ED', 100: '#FFE4D4', 200: '#FFC5A8', 300: '#FF9E71', 400: '#FF7A42', 500: '#E85D26', 600: '#C94A1A', 700: '#A33914', 800: '#7D2E13', 900: '#5A2210' },
          navy:       { DEFAULT: '#1E3A5F', 50: '#EFF4FB', 100: '#D4E0F0', 200: '#A9C2E0', 300: '#7DA3D0', 400: '#4A7BB5', 500: '#1E3A5F', 600: '#182F4D', 700: '#12243B', 800: '#0C1929', 900: '#060D17' },
          emerald:    { DEFAULT: '#059669', 50: '#ECFDF5', 100: '#D1FAE5', 200: '#A7F3D0', 300: '#6EE7B7', 400: '#34D399', 500: '#059669', 600: '#047857', 700: '#065F46', 800: '#064E3B', 900: '#043F2E' },
          surface:    { DEFAULT: '#FDF8F4', dark: '#0F172A' },
          card:       { DEFAULT: '#FFFFFF', dark: '#1E293B' },
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
        inter:  ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'civic':      '0 4px 24px -4px rgba(232, 93, 38, 0.15)',
        'civic-lg':   '0 8px 40px -8px rgba(232, 93, 38, 0.20)',
        'navy':       '0 4px 24px -4px rgba(30, 58, 95, 0.15)',
        'navy-lg':    '0 8px 40px -8px rgba(30, 58, 95, 0.25)',
        'glass':      '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glass-lg':   '0 16px 48px 0 rgba(0, 0, 0, 0.12)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.1)',
      },
      backgroundImage: {
        'civic-gradient':   'linear-gradient(135deg, #E85D26 0%, #C94A1A 50%, #1E3A5F 100%)',
        'civic-gradient-r': 'linear-gradient(135deg, #1E3A5F 0%, #E85D26 100%)',
        'navy-gradient':    'linear-gradient(180deg, #1E3A5F 0%, #0C1929 100%)',
        'warm-surface':     'linear-gradient(135deg, #FDF8F4 0%, #FFF3ED 100%)',
        'glass-white':      'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        'glass-dark':       'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.7) 100%)',
        'mesh-pattern':     'radial-gradient(circle at 20% 80%, rgba(232,93,38,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(30,58,95,0.08) 0%, transparent 50%)',
      },
      animation: {
        'float':           'float 6s ease-in-out infinite',
        'glow-pulse':      'glowPulse 2s ease-in-out infinite',
        'gradient-shift':  'gradientShift 8s ease infinite',
        'slide-up':        'slideUp 0.5s ease-out both',
        'scale-in':        'scaleIn 0.3s ease-out both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232,93,38,0.2)' },
          '50%':      { boxShadow: '0 0 40px rgba(232,93,38,0.4)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}