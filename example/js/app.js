/* global Vue, vForm, axios, AxiosMockAdapter */

// Register the alert components
Vue.component('alert-error', vForm.AlertError)
Vue.component('has-error', window.bs4 ? vForm.HasError4 : vForm.HasError)

new Vue({
  el: '#app',

  data: function () {
    return {
      // Create the form instance
      form: new vForm.Form({
        username: '',
        password: '',
        remember: false
      })
    }
  },

  methods: {
    login: function () {
      // Since we don't have an actual server, we'll mock the request.
      this.mockRequest()

      // Submit the form via a POST request.
      this.form.post('/auth/login')
        .then(({ data }) => console.log(data))
    },

    mockRequest: function () {
      var mock = new AxiosMockAdapter(axios, { delayResponse: 200 })

      mock.onPost('/auth/login').reply(422, {
        username: ['The username field is required.'],
        password: ['The password field is required.']
      })
    }
  }
})
