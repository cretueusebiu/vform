import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // minify: false,
    lib: {
      entry: resolve(__dirname, 'lib/index.js'),
      // formats: ['es', 'cjs', 'umd'],
      name: 'Form'
    },
    rollupOptions: {
      external: ['axios'],
      output: {
        globals: {
          axios: 'axios'
        },
        exports: 'named'
      }
    }
  }
})
