<template>
  <button type="submit" :disabled="form.busy" :aria-disabled="form.busy">
    <span v-if="form.busy && spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',

  props: {
    form: {
      type: Object,
      required: true
    },

    spinner: {
      type: Boolean,
      default: true
    }
  }
}
</script>
