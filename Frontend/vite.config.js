import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy : {
      '/youtube-tweeter' : 'http://localhost:7003'
    }
  },
  plugins: [react()],
})
