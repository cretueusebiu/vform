export default class FormErrors {
  /**
   * Create a new error bag instance.
   */
  constructor() {
    this.errors = {}
  }

  /**
   * Determine if the collection has any errors.
   *
   * @return {Boolean}
   */
  hasErrors() {
    return Object.keys(this.errors).length !== 0
  }

  /**
   * Get all of the errors for the collection in a flat array.
   *
   * @return {Array}
   */
  flatten() {
    return this.objectValues(this.errors).reduce((a, b) => a.concat(b))
  }

  /**
   * Determine if the collection has errors for a given field.
   *
   * @param  {String} field
   * @return {Boolean}
   */
  has(field) {
    return this.errors.hasOwnProperty(field)
  }

  /**
   * Determine if the collection has errors for a given fields.
   *
   * @return {Boolean}
   */
  hasAny() {
    return this.only.apply(this, arguments).length > 0
  }

  /**
   * Get all of the errors for the collection.
   *
   * @return {Object}
   */
  all() {
    return this.errors
  }

  /**
   * Get the first error message for a given field.
   *
   * @return {String|Null}
   */
  get(field) {
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
  only() {
    let messages = []

    for (let i = 0; i < arguments.length; i++) {
      let message = this.get(arguments[i])

      if (message) {
        messages.push(message)
      }
    }

    return messages
  }

  /**
   * Set the raw errors for the collection.
   *
   * @param {Object}
   */
  set(errors) {
    this.errors = errors
  }

  /**
   * Clear all of the errors from the collection.
   */
  clear() {
    this.errors = {}
  }

  /**
   * Object.values polyfil.
   *
   * @param  {Object} O
   * @return {Array}
   */
  objectValues(O) {
    return Object.keys(O).reduce((v, k) => v.concat(typeof k === 'string' && O.propertyIsEnumerable(k) ? [O[k]] : []), [])
  }
}
