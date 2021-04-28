import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname),

  plugins: [createVuePlugin()],

  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, './../public')
  },

  resolve: {
    alias: {
      vform: `${resolve(__dirname, './../src')}`
    }
  }
})
