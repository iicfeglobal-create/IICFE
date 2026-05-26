/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      colors: {
        lime:  { DEFAULT: '#008075', dark: '#006660', light: '#4db8ae' },
        ink:   { DEFAULT: '#0F1C26', soft: '#1B2A35', muted: '#2A3D4E' },
        paper: { DEFAULT: '#FFFFFF', soft: '#F8FAFC', warm: '#F4F6F0' },
        slate: {
          100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1',
          400: '#94A3B8', 500: '#64748B', 600: '#475569',
          700: '#334155', 800: '#1E293B', 900: '#0F172A',
        },
        teal:  { 50:'#F0FDFA', 100:'#CCFBF1', 200:'#99F6E4', 400:'#2DD4BF', 500:'#14B8A6', 600:'#0D9488', 700:'#0F766E', 800:'#115E59' },
        amber: { 50:'#FFFBEB', 100:'#FEF3C7', 200:'#FDE68A', 400:'#FBBF24', 500:'#F59E0B', 600:'#D97706', 700:'#B45309', 900:'#78350F' },
        violet:{ 50:'#F5F3FF', 100:'#EDE9FE', 200:'#DDD6FE', 400:'#A78BFA', 500:'#8B5CF6', 600:'#7C3AED', 700:'#6D28D9' },
        rose:  { 50:'#FFF1F2', 400:'#FB7185', 500:'#F43F5E', 600:'#E11D48' },
      },
      borderRadius: { '2xl': '1rem', '3xl': '1.5rem', '4xl': '2rem' },
      boxShadow: {
        'card':     '0 2px 16px rgba(15,17,23,0.06)',
        'card-md':  '0 8px 32px rgba(15,17,23,0.10)',
        'card-lg':  '0 20px 60px rgba(15,17,23,0.14)',
        'lime':     '0 8px 32px rgba(0,128,117,0.40)',
        'inset-top':'inset 0 2px 0 rgba(255,255,255,0.1)',
      },
    },
  },
  plugins: [],
}
