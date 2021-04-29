<template>
  <div v-if="form.successful" class="alert alert-success alert-dismissible" role="alert">
    <button v-if="dismissible" type="button" class="btn-close" aria-label="Dismiss" @click="dismiss" />

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
