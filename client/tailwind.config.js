export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['attribute', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: { primary: '#FF4D00', secondary: '#FF8C42', glow: 'rgba(255,77,0,0.2)' },
        dark: { bg: '#0A0A0F', card: '#111118', elevated: '#1A1A24', border: '#2A2A3A', text: '#F5F5F7', muted: '#A0A0B0' },
        light: { bg: '#FAFAF8', card: '#F0F0EC', elevated: '#E8E8E4', border: '#E0E0D8', text: '#0A0A0F', muted: '#555560' }
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body: ['Cabinet Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        'glow-pulse': { '0%, 100%': { boxShadow: '0 0 20px rgba(255,77,0,0.3)' }, '50%': { boxShadow: '0 0 60px rgba(255,77,0,0.6)' } }
      }
    }
  },
  plugins: [],
};
