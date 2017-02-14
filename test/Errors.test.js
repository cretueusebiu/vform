import test from 'ava'
import Errors from '../src/Errors'

let errors

test.beforeEach(() => {
  errors = new Errors()
})

test('it can set errors', t => {
  t.deepEqual(errors.errors, {})

  errors.set({ 'username': ['Value is required'] })

  t.deepEqual(errors.errors, { 'username': ['Value is required'] })
})

test('it can get all errors', t => {
  const allErrors = { 'username': ['Value is required'] }

  errors.set(allErrors)

  t.deepEqual(allErrors, errors.all())
})

test('it can determine if there is an error for a field', t => {
  errors.set({ 'username': ['Value is required'] })

  t.true(errors.has('username'))
})

test('it can determine if there are any errors for the given fields', t => {
  errors.set({ 'username': ['Value is required'], 'password': ['Value is required'], 'email': ['Value is required'] })

  t.true(errors.hasAny('username', 'email'))
})

test('it can determine if there are any errors', t => {
  errors.set({ 'username': ['Value is required'] })

  t.true(errors.any())
})

test('it can get the error message for a field', t => {
  errors.set({ 'username': ['Value is required'] })

  t.is('Value is required', errors.get('username'))
  t.is(errors.get('password'), undefined)
})

test('it can get the error message for the given fields', t => {
  errors.set({ 'username': ['Username is required'], 'password': ['Password is required'], 'email': ['Email is required'] })

  t.deepEqual(errors.only('username', 'email'), ['Username is required', 'Email is required'])
})

test('it can get all the errors in a flat array', t => {
  errors.set({ 'username': ['Username is required'], 'email': ['Email is required', 'Email is not valid'] })

  t.deepEqual(errors.flatten(), ['Username is required', 'Email is required', 'Email is not valid'])
})

test('it can clear one error field', t => {
  errors.set({ 'username': ['Value is required'], 'password': ['Value is required'] })

  errors.clear('username')

  t.false(errors.has('username'))
  t.true(errors.has('password'))
})

test('it can clear all the error fields', t => {
  errors.set({ 'username': ['Value is required'], 'password': ['Value is required'] })

  errors.clear()

  t.false(errors.any())
})
