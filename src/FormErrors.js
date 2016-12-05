export default class FormErrors {
  /**
   * Create a new error bag instance.
   */
  constructor () {
    this.errors = {}
  }

  /**
   * Determine if the collection has any errors.
   *
   * @return {Boolean}
   */
  hasErrors () {
    return Object.keys(this.errors).length !== 0
  }

  /**
   * Get all of the errors for the collection in a flat array.
   *
   * @return {Array}
   */
  flatten () {
    return Object.values(this.errors).reduce((a, b) => a.concat(b), [])
  }

  /**
   * Determine if the collection has errors for a given field.
   *
   * @param  {String} field
   * @return {Boolean}
   */
  has (field) {
    return this.errors.hasOwnProperty(field)
  }

  /**
   * Determine if the collection has errors for a given fields.
   *
   * @return {Boolean}
   */
  hasAny (...args) {
    if (args.length > 0) {
      return this.only.apply(this, args).length > 0
    }

    return this.flatten().length > 0
  }

  /**
   * Get all of the errors for the collection.
   *
   * @return {Object}
   */
  all () {
    return this.errors
  }

  /**
   * Get the first error message for a given field.
   *
   * @return {String|Null}
   */
  get (field) {
    if (this.has(field)) {
      const messages = this.errors[field]

      return Array.isArray(messages) ? messages[0] : messages
    }
  }

  /**
   * Get the first error message for a given fields.
   *
   * @return {Array}
   */
  only (...args) {
    const messages = []

    args.forEach(arg => {
      const message = this.get(arg)

      if (message) {
        messages.push(message)
      }
    })

    return messages
  }

  /**
   * Set the raw errors for the collection.
   *
   * @param {Object}
   */
  set (errors) {
    this.errors = errors
  }

  /**
   * Clear all of the errors from the collection.
   */
  clear () {
    this.errors = {}
  }

  /**
   * Remove the errors for the given field.
   *
   * @param {String} field
   */
  remove (field) {
    const errors = {}

    Object.keys(this.errors).forEach(key => {
      if (key !== field) {
        errors[key] = this.errors[key]
      }
    })

    this.set(errors)
  }
}
