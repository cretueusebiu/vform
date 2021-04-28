<template>
  <div v-if="form.errors.any()" class="alert alert-danger alert-dismissible" role="alert">
    <button v-if="dismissible" type="button" class="btn-close" aria-label="Close" @click="dismiss" />

    <div v-if="message" class="mb-2" v-html="message" />

    <ul class="mb-0 ps-4">
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
