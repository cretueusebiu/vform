import { mount } from '@vue/test-utils'
import { Form, AlertError } from './../../src'

describe('AlertError', () => {
  test('render alert if has any errors', () => {
    const form = new Form({ username: '' })
    form.errors.set({ username: 'Username is required' })

    const wrapper = mount(AlertError, {
      propsData: { form, message: 'Custom message' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('render alert with slot', () => {
    const form = new Form({ username: '' })
    form.errors.set({ username: 'Username is required' })

    const wrapper = mount(AlertError, {
      propsData: { form },
      slots: { default: '<div class="custom">Custom message</div>' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('doesn\'t render alert if successful', () => {
    const form = new Form({ username: '' })
    form.successful = true

    const wrapper = mount(AlertError, {
      propsData: { form, message: 'Custom message' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('dismiss alert', () => {
    const form = new Form({ username: '' })
    form.errors.set({ username: 'Username is required' })

    const wrapper = mount(AlertError, {
      propsData: { form, message: 'Custom message' }
    })

    wrapper.find('.close').trigger('click')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
