import Alert from './Alert'

export default {
  name: 'AlertSuccess',

  extends: Alert,

  props: {
    message: { type: String, default: '' }
  }
}
