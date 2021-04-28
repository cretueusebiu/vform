import Alert from './Alert'

export default {
  name: 'AlertError',

  extends: Alert,

  props: {
    message: {
      type: String,
      default: 'There were some problems with your input.'
    }
  }
}
