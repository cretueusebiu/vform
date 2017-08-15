import test from 'ava'
import Errors from '../src/Errors'

let errors

test.beforeEach(() => {
  errors = new Errors()
})

test('set errors', t => {
  t.deepEqual({}, errors.errors)

  errors.set({ 'username': ['Value is required'] })

  t.deepEqual(errors.errors, { 'username': ['Value is required'] })
})

test('get all errors', t => {
  const allErrors = { 'username': ['Value is required'] }

  errors.set(allErrors)

  t.deepEqual(errors.all(), allErrors)
})

test('determine if there is an error for a field', t => {
  errors.set({ 'username': ['Value is required'] })

  t.true(errors.has('username'))
})

test('determine if there are any errors for the given fields', t => {
  errors.set({ 'username': ['Value is required'], 'password': ['Value is required'], 'email': ['Value is required'] })

  t.true(errors.hasAny('username', 'email'))
})

test('determine if there are any errors', t => {
  errors.set({ 'username': ['Value is required'] })

  t.true(errors.any())
})

test('get the first error message for a field', t => {
  errors.set({ 'username': ['Value is required', 'Value must be unique'] })

  t.is(errors.get('username'), 'Value is required')
  t.is(errors.get('password'), undefined)
})

test('get all the error message for a field', t => {
  errors.set({ 'username': ['Value is required', 'Value must be unique'] })

  t.deepEqual(['Value is required', 'Value must be unique'], errors.getAll('username'))
})

test('get the error message for the given fields', t => {
  errors.set({ 'username': ['Username is required'], 'password': ['Password is required'], 'email': ['Email is required'] })

  t.deepEqual(['Username is required', 'Email is required'], errors.only('username', 'email'))
})

test('get all the errors in a flat array', t => {
  errors.set({ 'username': ['Username is required'], 'email': ['Email is required', 'Email is not valid'] })

  t.deepEqual(['Username is required', 'Email is required', 'Email is not valid'], errors.flatten())
})

test('clear one error field', t => {
  errors.set({ 'username': ['Value is required'], 'password': ['Value is required'] })

  errors.clear('username')

  t.false(errors.has('username'))
  t.true(errors.has('password'))
})

test('clear all the error fields', t => {
  errors.set({ 'username': ['Value is required'], 'password': ['Value is required'] })

  errors.clear()

  t.false(errors.any())
})
