import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
      target:'http://172.20.10.3:8090',
      changeOrigin:true,
      secure:false,
      rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  plugins: [react()],
})
