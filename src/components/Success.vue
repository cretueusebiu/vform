<template>
  <div class="alert alert-success" v-if="form.successful">
    <button v-if="dismissible" type="button" class="close" aria-label="Close" @click="dismiss">
      <span aria-hidden="true">&times;</span>
    </button>

    <div v-html="message"></div>
  </div>
</template>

<script>
import Alert from './Alert'

export default {
  extends: Alert,

  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>
