import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import Markdown from 'vite-plugin-md'
import prism from 'markdown-it-prism'
import anchor from 'markdown-it-anchor'

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname),

  plugins: [
    createVuePlugin({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown({
      // headEnabled: true,
      markdownItUses: [
        prism,
        anchor
      ],
      transforms: {
        after (html: string) {
          return html.replace(/({{)(.*)(}})/gi, '<span class="token punctuation">{{</span>$2<span class="token punctuation">}}</span>')
        }
      }
    })
  ],

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
