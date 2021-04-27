/**
 * Deep copy the given object.
 */
export function deepCopy<T> (obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const copy: any = Array.isArray(obj) ? [] : {}

  Object.keys(obj).forEach((key) => {
    copy[key] = deepCopy((obj as any)[key])
  })

  return copy
}

/**
 * If the given value is not an array, wrap it in one.
 */
export function arrayWrap (value: any): any[] {
  return Array.isArray(value) ? value : [value]
}
