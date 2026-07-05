/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  if (mode === 'production' && !process.env.VITE_DASHBOARD_URL) {
    throw new Error('VITE_DASHBOARD_URL must be set for production builds')
  }

  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'router': ['react-router-dom'],
            'icons': ['react-icons'],
          },
        },
      },
    },
  }
})
