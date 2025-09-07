/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-purple': 'rgb(var(--color-cyber-purple) / <alpha-value>)',
        'cyber-pink': 'rgb(var(--color-cyber-pink) / <alpha-value>)',
        'cyber-cyan': 'rgb(var(--color-cyber-cyan) / <alpha-value>)',
        'cyber-blue': 'rgb(var(--color-cyber-blue) / <alpha-value>)',
        'neon-green': 'rgb(var(--color-neon-green) / <alpha-value>)',
        'neon-yellow': 'rgb(var(--color-neon-yellow) / <alpha-value>)',
        'dark-purple': 'rgb(var(--color-dark-purple) / <alpha-value>)',
        'electric-blue': 'rgb(var(--color-electric-blue) / <alpha-value>)',
        'matrix-green': 'rgb(var(--color-matrix-green) / <alpha-value>)',
        'hot-pink': 'rgb(var(--color-hot-pink) / <alpha-value>)',
      },
      animation: {
        'cyber-glow': 'var(--animate-cyber-glow)',
        'float': 'var(--animate-float)',
        'pulse-slow': 'var(--animate-pulse-slow)',
      },
      fontFamily: {
        'cyber': 'var(--font-family-cyber)',
        'code': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
