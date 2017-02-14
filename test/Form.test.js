import test from 'ava'
import axios from 'axios'
import Form from '../src/Form'
import Errors from '../src/Errors'
import MockAdapter from 'axios-mock-adapter'

let form
let mockAdapter

test.beforeEach(() => {
  form = new Form({
    username: 'foo',
    password: 'bar'
  })

  mockAdapter = new MockAdapter(axios)
})

test('it instantiates the form properties', t => {
  t.false(form.busy)
  t.false(form.successful)
  t.false(form.successful)
  t.true(form.errors instanceof Errors)
  t.deepEqual(form.originalData, { username: 'foo', password: 'bar' })
})

test('it exposes the passed form field values as properties', t => {
  t.is(form.username, 'foo')
  t.is(form.password, 'bar')
})

test('it can get the form data', t => {
  t.deepEqual(form.data(), { username: 'foo', password: 'bar' })
})

test('it will start processing the form', t => {
  form.startProcessing()

  t.true(form.busy)
  t.false(form.successful)
  t.false(form.errors.any())
})

test('it will finish processing the form', t => {
  form.finishProcessing()

  t.false(form.busy)
  t.true(form.successful)
})

test('it can clear the form errors', t => {
  form.clear()

  t.false(form.errors.any())
  t.false(form.successful)
})

test('it can reset the form values', t => {
  form.username = 'bar'
  form.password = 'foo'
  form.reset()

  t.is(form.username, 'foo')
  t.is(form.password, 'bar')
})

test('it will submit the form successfully', t => {
  mockAdapter.onPost('/auth/login').reply(200)

  form.post('/auth/login').then(() => {
    t.false(form.busy)
    t.true(form.successful)
    t.false(form.errors.any())
  })
})

test('it will convert the data object to FormData if it contains files', async (t) => {
  form.photo = new Blob([new Uint8Array(10)], { type: 'image/png' })

  mockAdapter.onPut('/user/photo').reply(config => {
    t.true(config.data instanceof FormData)
    t.true(config.data.has('photo'))
    t.true(config.data.has('username'))

    return [200, {}]
  })

  await form.put('/user/photo')
})

test('it will set errors from the server', t => {
  mockAdapter.onPost('/auth/login').reply(422, {
    'username': ['Value is required']
  })

  form.post('/auth/login')
    .then(() => {})
    .catch(() => {})
    .then(() => {
      t.true(form.errors.any())
      t.false(form.busy)
      t.false(form.successful)
    })
})

test('it can extract the errors from the response object', t => {
  let response = {}
  t.deepEqual(form.extractErrors(response), { error: 'Something went wrong. Please try again.' })

  response = { data: { errors: { 'username': ['Value is required'] }}}
  t.deepEqual(form.extractErrors(response), { 'username': ['Value is required'] })

  response = { data: { message: 'Value is required' }}
  t.deepEqual(form.extractErrors(response), { 'error': 'Value is required' })

  response = { data: { 'username': ['Value is required'] }}
  t.deepEqual(form.extractErrors(response), { 'username': ['Value is required'] })
})
