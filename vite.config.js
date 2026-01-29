import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    tailwindcss(),],
  
  // Add build optimizations for deployment
  build: {
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Optimize bundle splitting
    rollupOptions: {
      // Reduce concurrent file operations
      maxParallelFileOps: 5,
      output: {
        manualChunks: (id) => {
          // More aggressive chunking for MUI icons to prevent file handle issues
          if (id.includes('@mui/icons-material')) {
            return 'mui-icons';
          }
          if (id.includes('@mui/material')) {
            return 'mui-material';
          }
          if (id.includes('@mui/x-date-pickers')) {
            return 'mui-pickers';
          }
          if (id.includes('@mui')) {
            return 'mui-core';
          }
          if (id.includes('react-router')) {
            return 'router';
          }
          if (id.includes('lucide-react')) {
            return 'lucide';
          }
          if (id.includes('swiper')) {
            return 'swiper';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    // Optimize for production
    minify: 'terser',
    sourcemap: false,
    // Reduce memory usage
    target: 'esnext',
    // Optimize chunk size
    assetsInlineLimit: 4096
  },
  
  // Server config for development
  server: {
    fs: {
      strict: false
    },
    host: true, // Needed for some deployment platforms
    port: 3000,
    proxy: {
      '/api': 'http://localhost:4000',
      '/newsletter': 'http://localhost:4000',
      
    },
  },
  
  // Preview config for production preview
  preview: {
    port: 4173,
    host: true
  }
})