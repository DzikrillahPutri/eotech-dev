import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import adonisjs from '@adonisjs/vite/client'
import inertia from '@adonisjs/inertia/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    inertia({ ssr: { enabled: false } }),
    adonisjs({ 
      entrypoints: ['inertia/app.ts'], 
      reload: ['resources/views/**/*.edge'] 
    }),
  ],
})