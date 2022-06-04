import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  }
})


// https://esbuild.github.io/api/#preserve-symlinks

// https://vitejs.dev/config/#resolve-preservesymlinks