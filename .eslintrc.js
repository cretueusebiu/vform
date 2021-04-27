module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended'
  ],
  plugins: [
  ],
  rules: {
    'vue/no-v-html': 'off'
  }
}
