<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-6 mx-auto">
        <div class="shadow-sm bg-white rounded-2 p-4">
          <input v-model="form.name" type="text" name="name">
          <input type="file" name="file" @change="handleFile">

          <form method="POST" class="mb-0" @submit.prevent="login" @keydown="form.onKeydown($event)">
            <AlertError :form="form" />
            <!-- <AlertErrors :form="form" /> -->
            <!-- <AlertSuccess :form="form" message="Your changes have beend saved!" /> -->

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input id="email" v-model="form.email" type="email" name="email" class="form-control">
              <HasError :form="form" field="email" />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input id="password" v-model="form.password" type="password" name="password" class="form-control">
              <HasError :form="form" field="password" />
            </div>

            <Button :form="form" class="btn btn-primary">
              Log In
            </Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Form from 'vform'
import { HasError, AlertError, AlertErrors, AlertSuccess, Button } from 'vform/components/bootstrap5'
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

  methods: {
    login () {
      this.form.post('/login-invalid')
    }
  }
}
</script>
