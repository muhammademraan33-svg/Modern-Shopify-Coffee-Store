/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C96D',
          shine: '#F5D98B',
          dark: '#8B6914',
          muted: '#A8892E',
        },
        soul: {
          black: '#050200',
          dark: '#0A0400',
          brown: '#140800',
          medium: '#1E0D00',
          warm: '#2A1505',
          card: '#120700',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #8B6914 0%, #C9A84C 40%, #E8C96D 60%, #C9A84C 80%, #8B6914 100%)',
        'gold-gradient-h': 'linear-gradient(90deg, #8B6914, #C9A84C, #E8C96D, #C9A84C, #8B6914)',
        'hero-gradient': 'radial-gradient(ellipse 70% 50% at 15% 60%, rgba(180,100,10,0.45) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 75% 25%, rgba(200,140,30,0.25) 0%, transparent 55%), radial-gradient(ellipse 40% 50% at 88% 75%, rgba(160,90,10,0.30) 0%, transparent 60%), linear-gradient(135deg, #050200 0%, #120800 45%, #1A0E00 75%, #070300 100%)',
        'dark-card': 'linear-gradient(145deg, #140800, #0A0400)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translateY(-25px) scale(1.05)', opacity: '0.9' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(201,168,76,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(201,168,76,0.7), 0 0 80px rgba(201,168,76,0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(2%, 2%)' },
          '30%': { transform: 'translate(-1%, 4%)' },
          '40%': { transform: 'translate(3%, -2%)' },
          '50%': { transform: 'translate(-3%, 1%)' },
          '60%': { transform: 'translate(1%, 3%)' },
          '70%': { transform: 'translate(2%, -4%)' },
          '80%': { transform: 'translate(-2%, 2%)' },
          '90%': { transform: 'translate(1%, -1%)' },
        },
      },
      boxShadow: {
        'gold': '0 0 20px rgba(201,168,76,0.4)',
        'gold-lg': '0 0 40px rgba(201,168,76,0.5), 0 0 80px rgba(201,168,76,0.2)',
        'card': '0 8px 40px rgba(0,0,0,0.6)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(201,168,76,0.15)',
      },
    },
  },
  plugins: [],
}
