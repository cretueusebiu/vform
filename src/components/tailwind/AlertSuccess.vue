<template>
  <div v-if="form.successful" class="rounded-md bg-green-50 p-4 mb-3" role="alert">
    <div class="flex">
      <div class="text-sm font-medium text-green-700">
        <slot>
          <div v-html="message" />
        </slot>
      </div>

      <div v-if="dismissible" class="ml-auto pl-3">
        <DismissButton @dismiss="dismiss" />
      </div>
    </div>
  </div>
</template>

<script>
import Base from './../AlertSuccess'
import DismissButton from './DismissButton.vue'

export default {
  name: 'AlertSuccess',

  components: {
    DismissButton
  },

  extends: Base
}
</script>
