import { assert, expect } from 'chai'
import Errors from '../src/Errors'

let errors

describe('Errors', () => {
  beforeEach(() => {
    errors = new Errors()
  })

  it('can set the errors', () => {
    expect(errors.errors).to.eql({})

    errors.set({ 'username': ['Value is required'] })

    expect(errors.errors).to.eql({ 'username': ['Value is required'] })
  })

  it('can get all errors', () => {
    const allErrors = { 'username': ['Value is required'] }

    errors.set(allErrors)

    assert.equal(allErrors, errors.all())
  })

  it('can determine if there is an error for a field', () => {
    errors.set({ 'username': ['Value is required'] })

    assert.isTrue(errors.has('username'))
  })

  it('can determine if there are any errors for the given fields', () => {
    errors.set({ 'username': ['Value is required'], 'password': ['Value is required'], 'email': ['Value is required'] })

    assert.isTrue(errors.hasAny('username', 'email'))
  })

  it('can determine if there are any errors', () => {
    errors.set({ 'username': ['Value is required'] })

    assert.isTrue(errors.any())
  })

  it('can get the error message for a field', () => {
    errors.set({ 'username': ['Value is required'] })

    assert.equal('Value is required', errors.get('username'))
    assert.isUndefined(errors.get('password'))
  })

  it('can get the error message for the given fields', () => {
    errors.set({ 'username': ['Username is required'], 'password': ['Password is required'], 'email': ['Email is required'] })

    expect(errors.only('username', 'email')).to.eql(['Username is required', 'Email is required'])
  })

  it('can get all the errors in a flat array', () => {
    errors.set({ 'username': ['Username is required'], 'email': ['Email is required', 'Email is not valid'] })

    expect(errors.flatten()).to.eql(['Username is required', 'Email is required', 'Email is not valid'])
  })

  it('can clear one error field', () => {
    errors.set({ 'username': ['Value is required'], 'password': ['Value is required'] })

    errors.clear('username')

    assert.isFalse(errors.has('username'))
    assert.isTrue(errors.has('password'))
  })

  it('can clear all the error fields', () => {
    errors.set({ 'username': ['Value is required'], 'password': ['Value is required'] })

    errors.clear()

    assert.isFalse(errors.any())
  })
})
