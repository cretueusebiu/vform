<template>
  <form method="POST" @submit.prevent="submit" @keydown="form.onKeydown($event)">
    <input v-model="form.title" type="text" name="title">

    <br>

    {{ form.title }}

    <br>

    <HasError :form="form" field="title" />

    <br>

    <button type="button" @click="form.errors.set('title', 'some error')">
      set errors
    </button>

    <button type="button" @click="form.errors.clear()">
      clear errors
    </button>
  </form>
</template>

<script lang="ts">
import Form, { HasError } from 'vform'

export default {
  name: 'App',

  components: {
    HasError
  },

  data () {
    return {
      form: Form.make({
        title: 'foo'
      })
    }
  },

  created () {
    // console.log(this.form.title)
  }
}
</script>
