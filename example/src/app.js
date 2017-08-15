import Vue from 'vue'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import { Form, HasError, AlertError } from 'vform'

// Register the components
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

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
      this.form.post('/login')
        .then(({ data }) => console.log(data))
    },

    mockRequest () {
      const mock = new AxiosMockAdapter(axios, { delayResponse: 200 })

      mock.onPost('/login').reply(422, {
        username: ['The username field is required.'],
        password: ['The password field is required.']
      })
    }
  }
})
