<template>
  <div v-if="form.errors.has(field)" class="invalid-feedback d-block" v-html="form.errors.get(field)" />
</template>

<script>
import Base from './../HasError'

export default {
  extends: Base
}
</script>
