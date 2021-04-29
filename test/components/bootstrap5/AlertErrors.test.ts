import { mount } from '@vue/test-utils'
import { Form } from './../../../src'
import AlertErrors from './../../../src/components/bootstrap5/AlertErrors.vue'

describe('AlertErrors', () => {
  test('render alert with a list of errors', () => {
    const form = new Form({ username: '', password: '' })
    form.errors.set({
      username: ['Username is required'],
      password: ['Password must be at least 6 characters', 'Password does not match']
    })

    const wrapper = mount(AlertErrors, {
      propsData: { form, message: 'Custom message' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('dismiss alert', () => {
    const form = new Form({ username: '', password: '' })
    form.errors.set({
      username: ['Username is required'],
      password: ['Password must be at least 6 characters', 'Password does not match']
    })

    const wrapper = mount(AlertErrors, {
      propsData: { form, message: 'Custom message' }
    })

    wrapper.find('.btn-close').trigger('click')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
