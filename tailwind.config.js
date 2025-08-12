/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'cosmic-blue': '#0F172A',
        'cosmic-purple': '#1E1B4B',
        'star-yellow': '#FCD34D',
        'nebula-pink': '#EC4899',
        'galaxy-indigo': '#6366F1',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)',
        'stars': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"20\" cy=\"20\" r=\"0.5\" fill=\"%23FCD34D\" opacity=\"0.8\"/><circle cx=\"80\" cy=\"30\" r=\"0.3\" fill=\"%23FCD34D\" opacity=\"0.6\"/><circle cx=\"40\" cy=\"60\" r=\"0.4\" fill=\"%23FCD34D\" opacity=\"0.7\"/><circle cx=\"90\" cy=\"80\" r=\"0.2\" fill=\"%23FCD34D\" opacity=\"0.5\"/><circle cx=\"10\" cy=\"90\" r=\"0.3\" fill=\"%23FCD34D\" opacity=\"0.6\"/></svg>')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%': { opacity: '0.3' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}