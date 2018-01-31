<template>
  <div v-if="form.successful" class="alert alert-success alert-dismissible" role="alert">
    <button v-if="dismissible" @click="dismiss" type="button" class="close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>

    <slot>
      <div v-html="message"></div>
    </slot>
  </div>
</template>

<script>
import Alert from './Alert'

export default {
  extends: Alert,

  name: 'alert-success',

  props: {
    message: String
  }
}
</script>
