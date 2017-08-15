require('browser-env')()
const Vue = require('vue')
const hooks = require('require-extension-hooks')

Vue.config.productionTip = false

hooks('vue').plugin('vue').push()
hooks(['vue', 'js']).plugin('babel').push()
