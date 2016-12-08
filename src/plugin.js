import Form from './Form'
import { HasError, HasError4, AlertError, AlertErrors, AlertSuccess } from './index'

export default {
  install (Vue, options) {
    if (!options.http) {
      throw new Error('[vform] You must set the http option.')
    }

    Form.http = options.http

    if (options.routes) {
      Form.routes = options.routes
    }

    if (options.components || options.components === undefined) {
      Vue.component('alert-error', AlertError)
      Vue.component('alert-errors', AlertErrors)
      Vue.component('alert-success', AlertSuccess)
      Vue.component('has-error', options.bs4 ? HasError4 : HasError)
    }

    const create = (data = {}) => new Form(data)

    Vue.form = create
    Vue.prototype.$form = create
  }
}
