<template>
  <div v-if="form.errors.any()" class="alert alert-danger alert-dismissible" role="alert">
    <button v-if="dismissible" type="button" class="btn-close" aria-label="Dismiss" @click="dismiss" />

    <slot>
      <div v-if="form.errors.has('error')" v-html="form.errors.get('error')" />
      <div v-else-if="form.errors.has('message')" v-html="form.errors.get('message')" />
      <div v-else v-html="message" />
    </slot>
  </div>
</template>

<script>
import Base from './../AlertError'

export default {
  extends: Base
}
</script>
