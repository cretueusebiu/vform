module.exports = {
  configureWebpack: config => {
    delete config.devtool
    delete config.output.libraryExport
    config.externals.axios = 'axios'
  }
}
