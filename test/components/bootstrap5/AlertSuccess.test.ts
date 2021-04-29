import { mount } from '@vue/test-utils'
import { Form } from './../../../src'
import AlertSuccess from './../../../src/components/bootstrap5/AlertSuccess.vue'

describe('AlertSuccess', () => {
  test('render alert if successful', () => {
    const form = new Form({ username: '' })
    form.successful = true

    const wrapper = mount(AlertSuccess, {
      propsData: { form, message: 'Custom message' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('render alert with slot', () => {
    const form = new Form({ username: '' })
    form.successful = true

    const wrapper = mount(AlertSuccess, {
      propsData: { form },
      slots: { default: '<div class="custom">Custom message</div>' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('deson\'t alert if has errors', () => {
    const form = new Form({ username: '' })
    form.errors.set({ username: 'Username is required' })

    const wrapper = mount(AlertSuccess, {
      propsData: { form, message: 'Custom message' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('dismiss alert', () => {
    const form = new Form({ username: '' })
    form.successful = true

    const wrapper = mount(AlertSuccess, {
      propsData: { form, message: 'Custom message' }
    })

    wrapper.find('.btn-close').trigger('click')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
