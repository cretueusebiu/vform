import axios from 'axios'
import Form from '@/Form'
import Errors from '@/Errors'
import MockAdapter from 'axios-mock-adapter'
import objectToFormData from 'object-to-formdata'

let form
let mockAdapter

beforeEach(() => {
  form = new Form({
    username: 'foo',
    password: 'bar'
  })

  mockAdapter = new MockAdapter(axios)
})

describe('Form', () => {
  test('instantiates the form properties', () => {
    expect(form.busy).toBeFalsy()
    expect(form.successful).toBeFalsy()
    expect(form.successful).toBeFalsy()
    expect(form.errors).toBeInstanceOf(Errors)
    expect(form.originalData).toEqual({ username: 'foo', password: 'bar' })
  })

  test('exposes the passed form field values as properties', () => {
    expect(form.username).toBe('foo')
    expect(form.password).toBe('bar')
  })

  test('it can get the form data keys', () => {
    expect(form.keys()).toEqual(['username', 'password'])
  })

  test('gets the form data', () => {
    expect(form.data()).toEqual({ username: 'foo', password: 'bar' })
  })

  test('fill form with data', () => {
    form.fill({
      username: 'user',
      password: 'secret',
      name: 'Foo'
    })

    expect(form.data()).toEqual({ username: 'user', password: 'secret' })
  })

  test('start processing the form', () => {
    form.startProcessing()

    expect(form.busy).toBeTruthy()
    expect(form.successful).toBeFalsy()
    expect(form.errors.any()).toBeFalsy()
  })

  test('finish processing the form', () => {
    form.finishProcessing()

    expect(form.busy).toBeFalsy()
    expect(form.successful).toBeTruthy()
  })

  test('clear the form errors', () => {
    form.clear()

    expect(form.errors.any()).toBeFalsy()
    expect(form.successful).toBeFalsy()
  })

  test('reset the form values', () => {
    form.username = 'bar'
    form.password = 'foo'
    form.reset()

    expect(form.username).toBe('foo')
    expect(form.password).toBe('bar')
  })

  test('submit the form successfully', async () => {
    mockAdapter.onPost('/login').reply(200)

    const form = new Form()

    await form.post('/login')

    expect(form.busy).toBeFalsy()
    expect(form.successful).toBeTruthy()
    expect(form.errors.any()).toBeFalsy()
  })

  test('transform data object to FormData', async () => {
    form.photo = new File([new Uint8Array(10)], { type: 'image/png' })

    mockAdapter.onPut('/user/photo').reply(config => {
      expect(config.data).toBeInstanceOf(FormData)
      expect(config.data.has('photo')).toBeTruthy()
      expect(config.data.has('username')).toBeTruthy()

      return [200, {}]
    })

    await form.submit('put', '/user/photo', {
      transformRequest: [(data, headers) => {
        return objectToFormData(data)
      }]
    })
  })

  test('set errors from the server', async () => {
    mockAdapter.onPost('/login').reply(422, {
      'username': ['Value is required']
    })

    const form = new Form()

    try {
      await form.post('/login')
    } catch (e) {}

    expect(form.errors.any()).toBeTruthy()
    expect(form.busy).toBeFalsy()
    expect(form.successful).toBeFalsy()
  })

  test('extract the errors from the response object', () => {
    let response = {}
    expect(form.extractErrors(response)).toEqual({ error: 'Something went wrong. Please try again.' })

    response = { data: 'invalid json' }
    expect(form.extractErrors(response)).toEqual({ error: 'Something went wrong. Please try again.' })

    response = { data: { errors: { 'username': ['Value is required'] } } }
    expect(form.extractErrors(response)).toEqual({ 'username': ['Value is required'] })

    response = { data: { message: 'Value is required' } }
    expect(form.extractErrors(response)).toEqual({ 'error': 'Value is required' })

    response = { data: { 'username': ['Value is required'] } }
    expect(form.extractErrors(response)).toEqual({ 'username': ['Value is required'] })
  })

  test('clear errors on from event', () => {
    form.errors.set({ 'username': ['Value is required'], 'password': ['Value is required'] })

    form.onKeydown({ target: { name: 'username' } })

    expect(form.errors.has('username')).toBeFalsy()
    expect(form.errors.has('password')).toBeTruthy()
  })
})
