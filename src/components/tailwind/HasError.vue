<template>
  <div v-if="form.errors.has(field)" class="mt-1 text-sm text-red-600" v-html="form.errors.get(field)" />
</template>

<script>
import Base from './../HasError'

export default {
  name: 'HasError',

  extends: Base
}
</script>
