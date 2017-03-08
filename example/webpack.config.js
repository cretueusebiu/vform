module.exports = {
  devtool: false,
  output: {
    filename: 'app.js'
  },
  externals: {
    vue: 'Vue',
    axios: 'axios',
    vform: 'vform',
    'axios-mock-adapter': 'AxiosMockAdapter'
  }
}
