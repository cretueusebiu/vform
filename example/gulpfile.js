var elixir = require('laravel-elixir');

elixir(function (mix) {
    mix.browserify('app.js', 'dist/app.js', 'js');
});
