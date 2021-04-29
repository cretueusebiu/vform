<template>
  <div v-if="form.errors.any()" class="alert alert-danger alert-dismissible" role="alert">
    <button v-if="dismissible" type="button" class="close" aria-label="Dismiss" @click="dismiss">
      <span aria-hidden="true">&times;</span>
    </button>

    <div v-if="message" class="mb-2" v-html="message" />

    <ul class="mb-0">
      <li v-for="(error, index) in form.errors.flatten()" :key="index" v-html="error" />
    </ul>
  </div>
</template>

<script>
import Base from './../AlertErrors'

export default {
  extends: Base
}
</script>
