<template>
  <div class="help-block invalid-feedback" v-if="form.errors.has(field)" v-html="form.errors.get(field)"></div>
</template>

<script>
export default {
  name: 'has-error',

  props: {
    form: {
      type: Object,
      required: true
    },

    field: {
      type: String,
      required: true
    }
  }
}
</script>
