import { mount } from '@vue/test-utils'
import { Form, HasError } from './../../src'

describe('HasError', () => {
  test('render error message', () => {
    const form = new Form({ username: '' })
    form.errors.set({ username: 'Username is required' })

    const wrapper = mount(HasError, {
      propsData: { form, field: 'username' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('doesn`t render error message', () => {
    const form = new Form({ username: '' })

    const wrapper = mount(HasError, {
      propsData: { form, field: 'username' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
