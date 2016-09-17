import HasError from './HasError'

export default {
  extends: HasError,

  template: `
    <div class="form-control-feedback" v-if="form.errors.has(field)" v-html="form.errors.get(field)"></div>
  `
}
