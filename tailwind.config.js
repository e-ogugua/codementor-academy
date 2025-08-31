/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cyber-themed color palette
        'cyber': {
          purple: 'rgb(var(--color-cyber-purple) / <alpha-value>)',
          pink: 'rgb(var(--color-cyber-pink) / <alpha-value>)',
          cyan: 'rgb(var(--color-cyber-cyan) / <alpha-value>)',
          blue: 'rgb(var(--color-cyber-blue) / <alpha-value>)',
        },
        'neon': {
          green: 'rgb(var(--color-neon-green) / <alpha-value>)',
          yellow: 'rgb(var(--color-neon-yellow) / <alpha-value>)',
        },
        'dark': {
          purple: 'rgb(var(--color-dark-purple) / <alpha-value>)',
        },
        'electric': {
          blue: 'rgb(var(--color-electric-blue) / <alpha-value>)',
        },
        'matrix': {
          green: 'rgb(var(--color-matrix-green) / <alpha-value>)',
        },
        'hot': {
          pink: 'rgb(var(--color-hot-pink) / <alpha-value>)',
        },
        // Primary/Secondary aliases
        'primary': 'rgb(var(--color-cyber-purple) / <alpha-value>)',
        'secondary': 'rgb(var(--color-cyber-pink) / <alpha-value>)',
        'accent': 'rgb(var(--color-cyber-cyan) / <alpha-value>)',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'cyber-glow': 'var(--animate-cyber-glow)',
        'float': 'var(--animate-float)',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'cyber': '0 0 20px rgba(236, 72, 153, 0.5)',
        'neon': '0 0 30px rgba(16, 185, 129, 0.6)',
        'glow': '0 0 40px rgba(139, 92, 246, 0.4)',
      },
    },
  },
  plugins: [],
}
