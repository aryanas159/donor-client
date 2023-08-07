import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/locations.json': 'https://serpapi.com/',
      '/search': 'https://serpapi.com/'
    }
  },
  plugins: [react()],

})
