import Vue from 'vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Form, HasError, HasError4, AlertError } from 'vform'

// Register the alert components
Vue.component('alert-error', AlertError)
Vue.component('has-error', window.bs4 ? HasError4 : HasError)

new Vue({
  el: '#app',

  data () {
    return {
      // Create the form instance
      form: new Form({
        username: '',
        password: '',
        remember: false
      })
    }
  },

  methods: {
    login () {
      // Since we don't have an actual server, we'll mock the request.
      this.mockRequest()

      // Submit the form via a POST request.
      this.form.post('/auth/login')
        .then(({ data }) => console.log(data))
    },

    mockRequest () {
      const mock = new MockAdapter(axios, { delayResponse: 200 })

      mock.onPost('/auth/login').reply(422, {
        username: ['The username field is required.'],
        password: ['The password field is required.']
      })
    }
  }
})
