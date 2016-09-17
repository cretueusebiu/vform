export default {
  props: {
    form: {
      type: Object,
      required: true
    },

    dismissible: {
      type: Boolean,
      default() {
        return true
      }
    }
  },

  methods: {
    dismiss() {
      if (this.dismissible) {
        this.form.clear()
      }
    }
  }
}
