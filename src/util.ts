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
export function arrayWrap<T> (value: T): T[] {
  return Array.isArray(value) ? value : [value]
}

/**
 * Determine if the given data has files.
 */
export function hasFiles (data: File | Blob | FileList | Record<string, any>): boolean {
  return data instanceof File ||
    data instanceof Blob ||
    data instanceof FileList ||
    (typeof data === 'object' && data !== null && Object.values(data).find(value => hasFiles(value)) !== undefined)
}
