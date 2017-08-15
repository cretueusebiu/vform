import Vue from 'vue'
import test from 'ava'
import { mount } from 'avoriaz'
import { Form, HasError, AlertError, AlertSuccess, AlertErrors } from '../src'

test('renders has-error when has error', t => {
  const form = new Form({ username: '' })
  form.errors.set({ username: 'Username is required' })

  const wrapper = mount(HasError, {
    propsData: { form, field: 'username' }
  })

  t.is(wrapper.html(), '<div class="help-block invalid-feedback">Username is required</div>')
})

test('doesn`t render has-error without error', t => {
  const form = new Form({ username: '' })

  const wrapper = mount(HasError, {
    propsData: { form, field: 'username' }
  })

  t.is(wrapper.html(), '<!---->')
})

test('renders alert error if has any error', t => {
  const form = new Form({ username: '' })
  form.errors.set({ username: 'Username is required' })

  const wrapper = mount(AlertError, {
    propsData: { form, field: 'username', message: 'Custom message' }
  })

  t.true(wrapper.hasClass('alert'))
  t.true(wrapper.hasClass('alert-danger'))
  t.is(wrapper.find('.alert > div')[0].text(), 'Custom message')
})

test('renders alert success', t => {
  const form = new Form({ username: '' })
  form.successful = true

  const wrapper = mount(AlertSuccess, {
    propsData: { form, field: 'username', message: 'Custom message' }
  })

  t.true(wrapper.hasClass('alert'))
  t.true(wrapper.hasClass('alert-success'))
  t.is(wrapper.find('.alert > div')[0].text(), 'Custom message')
})

test('renders alert with the list of errors', t => {
  const form = new Form({ username: '', password: '' })
  form.errors.set({
    username: ['Username is required'],
    password: ['Password must be at least 6 characters', 'Password does not match']
  })

  const wrapper = mount(AlertErrors, {
    propsData: { form, field: 'username', message: 'Custom message' }
  })

  t.true(wrapper.hasClass('alert'))
  t.true(wrapper.hasClass('alert-danger'))
  t.is(wrapper.find('.alert > div')[0].text(), 'Custom message')

  const li = wrapper.find('li').map(li => li.text())

  t.is(li[0], 'Username is required')
  t.is(li[1], 'Password must be at least 6 characters')
  t.is(li[2], 'Password does not match')
})
