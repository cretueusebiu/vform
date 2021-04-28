<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto bg-white p-4 mt-4 shadow-sm rounded-sm">
      <form method="POST" class="mb-0" @submit.prevent="login" @keydown="form.onKeydown($event)">
        <!-- <AlertError :form="form" /> -->
        <AlertErrors :form="form" />
        <!-- <AlertSuccess :form="form" message="Your changes have beend saved!" /> -->

        <div class="mb-3">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <div class="mt-1">
            <input
              id="email"
              v-model="form.email"
              type="text"
              name="email"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
          </div>
          <HasError :form="form" field="email" />
        </div>

        <div class="mb-3">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-1">
            <input
              id="password"
              v-model="form.password"
              type="text"
              name="password"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
          </div>
          <HasError :form="form" field="password" />
        </div>

        <Button :form="form" class="px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Log In
        </Button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Form from 'vform'
import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from 'vform/components/tailwindcss'
import './requests'

// Form.axios = axios
// ziggy-js route('login')

export default {
  components: {
    Button,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess
  },

  data () {
    return {
      form: Form.make({
        email: '',
        password: ''
      })
    }
  },

  created () {
    // this.form.successful = true
  },

  methods: {
    login () {
      this.form.post('/login-invalid')
    }
  }
}
</script>
