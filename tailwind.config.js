/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-purple': '#8B5CF6',
        'cyber-pink': '#EC4899',
        'cyber-cyan': '#06B6D4',
        'cyber-blue': '#3B82F6',
        'neon-green': '#10B981',
        'neon-yellow': '#EAB308',
        'dark-purple': '#581C87',
        'electric-blue': '#1E40AF',
        'matrix-green': '#22C55E',
        'hot-pink': '#F472B6'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'cyber': ['Orbitron', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'cyber-glow': 'cyberGlow 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'rotate-slow': 'rotate 20s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #8B5CF6' },
          '100%': { boxShadow: '0 0 20px #8B5CF6, 0 0 30px #8B5CF6' }
        },
        cyberGlow: {
          '0%': { boxShadow: '0 0 5px #EC4899, 0 0 10px #EC4899' },
          '100%': { boxShadow: '0 0 20px #EC4899, 0 0 30px #EC4899, 0 0 40px #EC4899' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }
    },
  },
  plugins: [],
}
