import Form from '../src/Form'
import Errors from '../src/Errors'
import axios from 'axios'
import { assert, expect } from 'chai'
import MockAdapter from 'axios-mock-adapter'

let form
let mockAdapter

describe('Form', () => {
  beforeEach(() => {
    form = new Form({
      username: 'foo',
      password: 'bar'
    })

    mockAdapter = new MockAdapter(axios)
  })

  it('instantiates the form properties', () => {
    assert.isFalse(form.busy)
    assert.isFalse(form.successful)
    assert.isFalse(form.successful)
    expect(form.errors).to.be.an.instanceof(Errors)
    expect(form.originalData).to.eql({ username: 'foo', password: 'bar' })
  })

  it('exposes the passed form field values as properties', () => {
    assert.equal(form.username, 'foo')
    assert.equal(form.password, 'bar')
  })

  it('can get the form data', () => {
    expect(form.data()).to.eql({ username: 'foo', password: 'bar' })
  })

  it('will start processing the form', () => {
    form.startProcessing()

    assert.isTrue(form.busy)
    assert.isFalse(form.successful)
    assert.isFalse(form.errors.any())
  })

  it('will finish processing the form', () => {
    form.finishProcessing()

    assert.isFalse(form.busy)
    assert.isTrue(form.successful)
  })

  it('can clear the form errors', () => {
    form.clear()

    assert.isFalse(form.errors.any())
    assert.isFalse(form.successful)
  })

  it('can reset the form values', () => {
    form.username = 'bar'
    form.password = 'foo'
    form.reset()

    assert.equal(form.username, 'foo')
    assert.equal(form.password, 'bar')
  })

  it('will submit the form successfully', async () => {
    mockAdapter.onPost('/auth/login').reply(200)

    await form.post('/auth/login')

    assert.isFalse(form.busy)
    assert.isTrue(form.successful)
    assert.isFalse(form.errors.any())
  })

  it('will convert the data object to FormData if it contains files', async () => {
    form.photo = new Blob([new Uint8Array(10)], { type: 'image/png' })

    mockAdapter.onPut('/user/photo').reply(config => {
      expect(config.data).to.be.an.instanceof(FormData)

      assert.isTrue(config.data.has('photo'))
      assert.isTrue(config.data.has('username'))

      return [200, {}]
    })

    await form.put('/user/photo')
  })

  it('will set errors from the server', async () => {
    mockAdapter.onPost('/auth/login').reply(422, {
      'username': ['Value is required']
    })

    try {
      await form.post('/auth/login')
    } catch (e) {}

    assert.isTrue(form.errors.any())
    assert.isFalse(form.busy)
    assert.isFalse(form.successful)
  })

  it('can extract the errors from the response object', () => {
    let response = {}
    expect(form.extractErrors(response)).to.eql({ error: 'Something went wrong. Please try again.' })

    response = { data: { errors: { 'username': ['Value is required'] }}}
    expect(form.extractErrors(response)).to.eql({ 'username': ['Value is required'] })

    response = { data: { message: 'Value is required' }}
    expect(form.extractErrors(response)).to.eql({ 'error': 'Value is required' })

    response = { data: { 'username': ['Value is required'] }}
    expect(form.extractErrors(response)).to.eql({ 'username': ['Value is required'] })
  })
})
