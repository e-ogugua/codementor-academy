/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Mobile-first breakpoint system as requested
      screens: {
        xs: '480px', // Extra small devices (landscape phones)
        sm: '640px', // Small devices (tablets)
        md: '768px', // Medium devices (small laptops)
        lg: '1024px', // Large devices (desktops)
        xl: '1280px', // Extra large devices (large desktops)
        '2xl': '1536px', // 2X large devices (larger desktops)
      },
      colors: {
        // Cyber-themed color palette
        cyber: {
          purple: 'rgb(var(--color-cyber-purple) / <alpha-value>)',
          pink: 'rgb(var(--color-cyber-pink) / <alpha-value>)',
          cyan: 'rgb(var(--color-cyber-cyan) / <alpha-value>)',
          blue: 'rgb(var(--color-cyber-blue) / <alpha-value>)',
        },
        neon: {
          green: 'rgb(var(--color-neon-green) / <alpha-value>)',
          yellow: 'rgb(var(--color-neon-yellow) / <alpha-value>)',
        },
        dark: {
          purple: 'rgb(var(--color-dark-purple) / <alpha-value>)',
        },
        electric: {
          blue: 'rgb(var(--color-electric-blue) / <alpha-value>)',
        },
        matrix: {
          green: 'rgb(var(--color-matrix-green) / <alpha-value>)',
        },
        hot: {
          pink: 'rgb(var(--color-hot-pink) / <alpha-value>)',
        },
        // Primary/Secondary aliases
        primary: 'rgb(var(--color-cyber-purple) / <alpha-value>)',
        secondary: 'rgb(var(--color-cyber-pink) / <alpha-value>)',
        accent: 'rgb(var(--color-cyber-cyan) / <alpha-value>)',
      },
      fontFamily: {
        cyber: ['Orbitron', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid typography using clamp() for responsive scaling
        xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        sm: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        base: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        lg: 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        xl: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        '2xl': 'clamp(1.5rem, 1.3rem + 1vw, 1.875rem)',
        '3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)',
        '4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)',
        '5xl': 'clamp(3rem, 2.5rem + 2.5vw, 4rem)',
      },
      spacing: {
        // Fluid spacing tokens for consistent vertical rhythm
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      animation: {
        'cyber-glow': 'var(--animate-cyber-glow)',
        float: 'var(--animate-float)',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // Reduced motion alternatives
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      boxShadow: {
        cyber: '0 0 20px rgba(236, 72, 153, 0.5)',
        neon: '0 0 30px rgba(16, 185, 129, 0.6)',
        glow: '0 0 40px rgba(139, 92, 246, 0.4)',
      },
    },
  },
  plugins: [],
};
