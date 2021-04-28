import { deepCopy, arrayWrap } from 'vform/util'

describe('util', () => {
  test('deep copy a plain object', () => {
    const obj = { a: { b: { c: 1 } } }
    const copy = deepCopy(obj)
    obj.a.b.c = 2

    expect(copy.a.b.c).toBe(1)
    expect(copy).toEqual({ a: { b: { c: 1 } } })
  })

  test('wrap value if not an array', () => {
    expect(arrayWrap('foo')).toEqual(['foo'])
    expect(arrayWrap(['foo'])).toEqual(['foo'])
    expect(arrayWrap({ foo: 'bar' })).toEqual([{ foo: 'bar' }])
  })
})
