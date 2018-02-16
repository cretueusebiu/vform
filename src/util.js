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
 *
 */
}
