import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios, { delayResponse: 500 })

mock.onPost('/login-invalid').reply(422, {
  errors: {
    email: ['The email field is invalid.'],
    password: ['The password field is invalid.']
  },
  message: 'The given data was invalid.'
})
