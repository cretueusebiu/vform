<template>
  <div v-if="form.errors.any()" class="rounded-md bg-red-50 p-4 mb-3" role="alert">
    <div class="flex">
      <div class="text-sm font-medium text-red-700">
        <slot>
          <div v-if="form.errors.has('error')" v-html="form.errors.get('error')" />
          <div v-else-if="form.errors.has('message')" v-html="form.errors.get('message')" />
          <div v-else v-html="message" />
        </slot>
      </div>

      <div v-if="dismissible" class="ml-auto pl-3">
        <DismissButton @dismiss="dismiss" />
      </div>
    </div>
  </div>
</template>

<script>
import Base from './../AlertError'
import DismissButton from './DismissButton.vue'

export default {
  components: {
    DismissButton
  },

  extends: Base
}
</script>
