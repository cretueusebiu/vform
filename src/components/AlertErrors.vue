<template>
  <div v-if="form.errors.any()" class="alert alert-danger alert-dismissible" role="alert">
    <button v-if="dismissible" type="button" class="close" aria-label="Close" @click="dismiss">
      <span aria-hidden="true">&times;</span>
    </button>

    <div v-if="message" v-html="message"/>

    <ul>
      <li v-for="error in form.errors.flatten()" v-html="error"/>
    </ul>
  </div>
</template>

<script>
import Alert from './Alert'

export default {
  name: 'alert-errors',

  extends: Alert,

  props: {
    message: {
      type: String,
      default: 'There were some problems with your input.'
    }
  }
}
</script>
