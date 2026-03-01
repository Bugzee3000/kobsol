import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Nécessaire pour que Supabase auth fonctionne avec les redirects
  server: {
    port: 5173,
  },
})
