import Alert from './Alert'

export default {
  extends: Alert,

  props: {
    message: {
      type: String,
      default() {
        return 'There were some problems with your input.'
      }
    }
  },

  template: `
    <div class="alert alert-danger" v-if="form.errors && form.errors.hasErrors()">
      <button v-if="dismissible" type="button" class="close" aria-label="Close" @click="dismiss">
        <span aria-hidden="true">&times;</span>
      </button>

      <div v-if="message" v-html="message"></div>

      <ul>
        <li v-for="error in form.errors.flatten()" v-html="error"></li>
      </ul>
    </div>
  `
}
