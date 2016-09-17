const elixir = require('laravel-elixir')

elixir(mix => {
  mix.webpack('app.js', 'dist/app.js', 'js')
})
