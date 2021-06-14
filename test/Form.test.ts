import axios, { AxiosResponse } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { serialize as objectToFormData } from 'object-to-formdata'
import Form, { Errors } from './../src'

let form: Form
let mockAdapter: MockAdapter

beforeEach(() => {
  Form.recentlySuccessfulTimeout = 100

  form = Form.make({
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
    expect(form.recentlySuccessful).toBeFalsy()
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
    expect(form.recentlySuccessful).toBeFalsy()
    expect(form.errors.any()).toBeFalsy()
  })

  test('finish processing the form', () => {
    form.finishProcessing()

    expect(form.busy).toBeFalsy()
    expect(form.successful).toBeTruthy()
    expect(form.recentlySuccessful).toBeTruthy()
  })

  test('clear the form errors', () => {
    form.successful = true
    form.recentlySuccessful = true

    form.clear()

    expect(form.errors.any()).toBeFalsy()
    expect(form.successful).toBeFalsy()
    expect(form.recentlySuccessful).toBeFalsy()
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
    expect(form.recentlySuccessful).toBeTruthy()
    expect(form.errors.any()).toBeFalsy()

    await new Promise(resolve => setTimeout(resolve, 101))

    expect(form.recentlySuccessful).toBeFalsy()
  })

  test('transform data object to FormData', async () => {
    form.photo = new File([new Uint8Array(10)], 'photo.jpg', { type: 'image/png' })

    mockAdapter.onPut('/user/photo').reply((config) => {
      expect(config.data).toBeInstanceOf(FormData)
      expect(config.data.has('photo')).toBeTruthy()
      expect(config.data.has('username')).toBeTruthy()

      return [200, {}]
    })

    await form.submit('put', '/user/photo', {
      transformRequest: [(data, _headers) => objectToFormData(data)]
    })
  })

  test('set errors from the server', async () => {
    mockAdapter.onPost('/login').reply(422, {
      username: ['Value is required']
    })

    const form = new Form()

    try {
      await form.post('/login')
    } catch (e) {}

    expect(form.errors.any()).toBeTruthy()
    expect(form.busy).toBeFalsy()
    expect(form.successful).toBeFalsy()
    expect(form.recentlySuccessful).toBeFalsy()
  })

  test('make get request', async () => {
    mockAdapter.onGet('/projects', { params: { search: 'vue' } }).reply(200, {
      results: ['a', 'b']
    })

    const form = new Form({
      search: 'vue'
    })

    const { data } = await form.get('/projects')

    expect(data).toEqual({ results: ['a', 'b'] })
  })

  test('update form with data', () => {
    form.update({
      password: 'updated',
      foo: 'bar'
    })

    expect(form.data()).toEqual({ foo: 'bar', username: 'foo', password: 'updated' })
  })

  test('extract the errors from the response object', () => {
    const response: AxiosResponse = { data: '', status: 0, statusText: '', headers: {}, config: {} }

    expect(form.extractErrors(response)).toEqual({ error: 'Something went wrong. Please try again.' })

    response.data = 'invalid json'
    expect(form.extractErrors(response)).toEqual({ error: 'Something went wrong. Please try again.' })

    response.data = { errors: { username: ['Value is required'] } }
    expect(form.extractErrors(response)).toEqual({ username: ['Value is required'] })

    response.data = { message: 'Value is required' }
    expect(form.extractErrors(response)).toEqual({ error: 'Value is required' })

    response.data = { username: ['Value is required'] }
    expect(form.extractErrors(response)).toEqual({ username: ['Value is required'] })
  })

  test('clear errors on from event', () => {
    form.errors.set({ username: ['Value is required'], password: ['Value is required'] })

    // @ts-ignore
    form.onKeydown({ target: { name: 'username' } })

    expect(form.errors.has('username')).toBeFalsy()
    expect(form.errors.has('password')).toBeTruthy()
  })
})
