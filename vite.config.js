import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import removeConsole from 'vite-plugin-remove-console'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // removeConsole()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})
