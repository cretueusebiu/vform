import { arrayWrap } from './util'

export default class Errors {
  errors: Record<string, any> = {}

  /**
   * Create a new error bag instance.
   */
  constructor () {
    this.errors = {}
  }

  /**
   * Set the errors object or field error messages.
   */
  set (field: string | Record<string, any>, messages: any = undefined) {
    if (typeof field === 'object') {
      this.errors = field
    } else {
      this.set({ ...this.errors, [field]: arrayWrap(messages) })
    }
  }

  /**
   * Get all the errors.
   */
  all () {
    return this.errors
  }

  /**
   * Determine if there is an error for the given field.
   */
  has (field: string) {
    return Object.prototype.hasOwnProperty.call(this.errors, field)
  }

  /**
   * Determine if there are any errors for the given fields.
   */
  hasAny (...fields: string[]) {
    return fields.some(field => this.has(field))
  }

  /**
   * Determine if there are any errors.
   */
  any () {
    return Object.keys(this.errors).length > 0
  }

  /**
   * Get the first error message for the given field.
   */
  get (field: string): string|undefined {
    if (this.has(field)) {
      return this.getAll(field)[0]
    }
  }

  /**
   * Get all the error messages for the given field.
   */
  getAll (field: string): string[] {
    return arrayWrap(this.errors[field] || [])
  }

  /**
   * Get the error message for the given fields.
   */
  only (...fields: string[]) {
    const messages: string[] = []

    fields.forEach((field) => {
      const message = this.get(field)

      if (message) {
        messages.push(message)
      }
    })

    return messages
  }

  /**
   * Get all the errors in a flat array.
   */
  flatten (): string[] {
    return Object.values(this.errors).reduce((a, b) => a.concat(b), [])
  }

  /**
   * Clear one or all error fields.
   */
  clear (field: string | undefined = undefined) {
    const errors: Record<string, any> = {}

    if (field) {
      Object.keys(this.errors).forEach((key) => {
        if (key !== field) {
          errors[key] = this.errors[key]
        }
      })
    }

    this.set(errors)
  }
}
