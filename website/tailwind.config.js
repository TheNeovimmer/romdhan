/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#18dc6a',
          dark: '#14b85a',
          light: '#2ef085',
        },
        background: {
          light: '#f6f8f7',
          dark: '#0a0f0c',
        },
        card: {
          dark: '#161e1a',
          light: '#ffffff',
        },
        border: {
          dark: '#24332a',
          light: '#e2e8e4',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        orange: {
          400: '#fb923c',
        },
        green: {
          400: '#4ade80',
          500: '#22c55e',
        },
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'Amiri', 'serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(24, 220, 106, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(24, 220, 106, 0.5)' },
        },
      },
      boxShadow: {
        terminal: '0 0 40px -10px rgba(24, 220, 106, 0.2)',
        'terminal-lg': '0 0 60px -10px rgba(24, 220, 106, 0.3)',
        glow: '0 0 20px rgba(24, 220, 106, 0.4)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
