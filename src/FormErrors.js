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
   * @param  {...String} fields
   * @return {Boolean}
   */
  hasAny (...fields) {
    if (fields.length > 0) {
      return this.only.apply(this, fields).length > 0
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
   * @return {String|null}
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
   * @param  {...String} fields
   * @return {Array}
   */
  only (...fields) {
    const messages = []

    fields.forEach(field => {
      const message = this.get(field)

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
