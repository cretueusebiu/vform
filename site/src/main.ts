import Vue from 'vue'

import 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-markup-templating'

import 'github-markdown-css/github-markdown.css'
import 'prism-material-themes/themes/material-lighter.css'
// import 'prism-material-themes/themes/material-palenight.css'

import App from './App.vue'
import Example from './Example.vue'
import './main.css'

Vue.config.productionTip = false

Vue.component('Example', Example)

new Vue({
  render: h => h(App)
}).$mount('#app')
