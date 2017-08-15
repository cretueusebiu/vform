<template>
  <div v-if="form.errors.any()" class="alert alert-danger alert-dismissible" role="alert">
    <button v-if="dismissible" @click="dismiss" type="button" class="close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>

    <div v-if="message" v-html="message"></div>

    <ul>
      <li v-for="error in form.errors.flatten()" v-html="error"></li>
    </ul>
  </div>
</template>

<script>
import Alert from './Alert'

export default {
  extends: Alert,

  name: 'alert-errors',

  props: {
    message: {
      type: String,
      default: 'There were some problems with your input.'
    }
  }
}
</script>
