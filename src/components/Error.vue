<template>
  <div v-if="form.errors.any()" class="alert alert-danger alert-dismissible" role="alert">
    <button v-if="dismissible" @click="dismiss" type="button" class="close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>

    <div v-if="form.errors.has('error')" v-html="form.errors.get('error')"></div>
    <div v-else v-html="message"></div>
  </div>
</template>

<script>
import Alert from './Alert'

export default {
  extends: Alert,

  name: 'alert-error',

  props: {
    message: {
      type: String,
      default: 'There were some problems with your input.'
    }
  }
}
</script>
