import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
"/user":"http://localhost:2000"
    }
  },
  plugins: [react()],
})
