import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],

  build: {
    // minify: false,
    lib: {
      entry: resolve(__dirname, 'tmp/index.js'),
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
