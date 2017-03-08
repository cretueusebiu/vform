<template>
  <div class="form-control-feedback" v-if="form.errors.has(field)" v-html="form.errors.get(field)"></div>
</template>

<script>
import HasError from './HasError'

export default {
  extends: HasError,

  name: 'has-error'

}
</script>
