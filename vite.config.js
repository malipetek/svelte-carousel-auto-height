import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './src/index.js'
      },
      output: [{
        format: 'cjs',
        entryFileNames: 'index.js'
      }, {
        format: 'es',
        entryFileNames: 'index.mjs'
      }]
    }
  },
  plugins: [svelte({
    
  })],
})
