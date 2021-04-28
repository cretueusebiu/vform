<template>
  <div v-if="form.successful" class="alert alert-success alert-dismissible" role="alert">
    <button v-if="dismissible" type="button" class="close" aria-label="Close" @click="dismiss">
      <span aria-hidden="true">&times;</span>
    </button>

    <slot>
      <div v-html="message" />
    </slot>
  </div>
</template>

<script>
import Base from './../AlertSuccess'

export default {
  extends: Base
}
</script>
