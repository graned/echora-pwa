import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/icons-material'],
    exclude: ['@mui/material']
  },
  server: {
    watch: {
      usePolling: true
    }
  }
})
