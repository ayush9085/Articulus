import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three')) {
            return 'vendor-three'
          }
          if (id.includes('framer-motion')) {
            return 'vendor-motion'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
})
