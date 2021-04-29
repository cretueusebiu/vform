import Alert from './Alert'

export default {
  extends: Alert,

  props: {
    message: { type: String, default: '' }
  }
}
