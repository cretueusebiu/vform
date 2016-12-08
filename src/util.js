/**
 * Deep copy the given object.
 *
 * @param  {Object} obj
 * @return {Object}
 */
export function deepCopy (obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const copy = Array.isArray(obj) ? [] : {}

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key])
  })

  return copy
}

/**
 * Determinte if the given object has any files.
 *
 * @param  {Object} obj
 * @return {Boolean}
 */
export function hasFile (obj) {
  return Object.keys(obj).some(key =>
    obj[key] instanceof Blob || obj[key] instanceof FileList
  )
}

/**
 * Convert the given object to a FormData instance.
 *
 * @param  {Object} obj
 * @return {FormData}
 */
export function toFormData (obj) {
  const data = new FormData()

  Object.keys(obj).forEach(key => {
    const value = obj[key]

    if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        data.append(`${key}[]`, value.item(i))
      }
    } else {
      data.append(key, value)
    }
  })

  return data
}
