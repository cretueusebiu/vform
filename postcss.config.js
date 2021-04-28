module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-nested'),
    require('postcss-import'),
    require('./site/postcss-nested-import')
  ]
}
