import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // écoute sur toutes les interfaces (ex : pour localtunnel)
    allowedHosts: ['rich-pianos-punch.loca.lt'], // hôte autorisé
  },
})