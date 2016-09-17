import Form from './Form'
import { HasError, HasError4, AlertError, AlertErrors, AlertSuccess } from './index'

export default {
  install(Vue, options = {}) {
    if (options.routes) {
      Form.routes(options.routes)
    }

    if (options.components) {
      Vue.component('alert-error', AlertError)
      Vue.component('alert-errors', AlertErrors)
      Vue.component('alert-success', AlertSuccess)
      Vue.component('has-error', options.bs4 ? HasError4 : HasError)
    }

    const create = (data = {}, merge = {})  => new Form(data, merge)

    Vue.form = create
    Vue.prototype.$form = create
  }
}
