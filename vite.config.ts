import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable code splitting for better caching and loading performance
    rollupOptions: {
      output: {
        // Split chunks to reduce initial bundle size
        manualChunks: {
          // Vendor chunk for React and related libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI chunk for animation and styling libraries
          ui: ['framer-motion', 'lucide-react'],
          // Utility chunk for helper functions
          utils: ['recharts'],
        },
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Enable compression for production builds
    minify: 'terser',
    // Optimize CSS
    cssCodeSplit: true,
    // Set chunk size warnings (target <120kB per route)
    chunkSizeWarningLimit: 120,
  },
  // Enable experimental features for better performance
  esbuild: {
    // Remove console logs in production builds
    drop: ['console', 'debugger'],
  },
});
