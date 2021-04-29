<template>
  <div class="mb-10">
    <h2 class="mb-3 text-2xl font-medium dark:text-gray-200">
      Demo
    </h2>

    <form class="panel mb-0" @submit.prevent="login" @keydown="form.onKeydown($event)">
      <AlertError :form="form" />
      <!-- <AlertErrors :form="form" /> -->
      <!-- <AlertSuccess :form="form" message="Your changes have beend saved!" /> -->

      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input id="username" v-model="form.username" type="text" name="username" class="form-control">
        <HasError :form="form" field="username" />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input id="password" v-model="form.password" type="text" name="password" class="form-control">
        <HasError :form="form" field="password" />
      </div>

      <Button :form="form" class="btn btn-primary">
        <LoginIcon v-if="!form.busy" class="h-5 w-5 mr-2" />
        Log In
      </Button>
    </form>
  </div>
</template>

<script lang="ts">
import Form from 'vform'
import axios from 'axios'
import { Button, HasError, AlertError } from 'vform/components/tailwind'
import MockAdapter from 'axios-mock-adapter'
import LoginIcon from './icons/LoginIcon.vue'

export default {
  components: {
    Button,
    HasError,
    LoginIcon,
    AlertError
  },

  data () {
    return {
      form: Form.make({
        username: '',
        password: ''
      })
    }
  },

  methods: {
    login () {
      new MockAdapter(axios, { delayResponse: 250 }).onPost('/login').reply(422, {
        errors: {
          username: ['The username field is invalid.'],
          password: ['The password field is invalid.']
        },
        message: 'The given data was invalid.'
      })

      this.form.post('/login')
    }
  }
}
</script>
