<template>
  <div>
    <input v-model="form.title" type="text">

    <code>{{ form.title }}</code>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Form from './../src/index'

export default defineComponent({
  name: 'App',

  data () {
    return {
      form: new Form({
        title: 'foo'
      })
    }
  }
})
</script>
