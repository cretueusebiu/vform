<template>
  <div v-if="form.errors.any()" class="rounded-md bg-red-50 p-4 mb-3" role="alert">
    <div class="flex">
      <div>
        <slot>
          <div v-if="message" class="text-sm font-medium text-red-700" v-html="message" />

          <div class="mt-2 text-sm text-red-700">
            <ul class="list-disc pl-5 space-y-1">
              <li v-for="(error, index) in form.errors.flatten()" :key="index" v-html="error" />
            </ul>
          </div>
        </slot>
      </div>

      <div v-if="dismissible" class="ml-auto pl-3">
        <DismissButton @dismiss="dismiss" />
      </div>
    </div>
  </div>
</template>

<script>
import Base from './../AlertErrors'
import DismissButton from './DismissButton.vue'

export default {
  name: 'AlertErrors',

  components: {
    DismissButton
  },

  extends: Base
}
</script>
