import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@routes': '/src/routes',
      '@usecase': '/src/service',
      '@domain': '/src/models',
      '@utils': '/src/utils',
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://shopping-mapper.onrender.com/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
