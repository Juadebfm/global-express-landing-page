/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const requiredProductionEnv = [
    'VITE_API_BASE_URL',
    'VITE_DASHBOARD_URL',
    'VITE_TURNSTILE_SITE_KEY',
  ]
  const missingProductionEnv = requiredProductionEnv.filter(
    (name) => !process.env[name]
  )

  if (mode === 'production' && missingProductionEnv.length > 0) {
    throw new Error(
      `Missing required production environment variables: ${missingProductionEnv.join(', ')}`
    )
  }

  return {
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
    },
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
