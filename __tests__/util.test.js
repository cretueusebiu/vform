import { assert, expect } from 'chai'
import { deepCopy, hasFile, toFormData } from '../src/util'

describe('util', () => {
  it('can deep copy a plain object', () => {
    const obj = { a: { b: { c: 1 }}}
    const copy = deepCopy(obj)
    obj.a.b.c = 2

    expect(copy).to.eql({ a: { b: { c: 1 }}})
    assert.equal(copy.a.b.c, 1)
  })

  it('can determine if the object contains any files', () => {
    assert.isFalse(hasFile({ username: 'foo' }))
    assert.isTrue(hasFile({ photo: new Blob([new Uint8Array(10)], { type: 'image/png' }) }))
  })

  it('will convert a plain object to a FormData object', () => {
    const obj = {
      username: 'foo',
      photo: new Blob([new Uint8Array(10)], { type: 'image/png' }),
      items: [{ name: 'item 1' }, { name: 'item 2' }]
    }

    const data = toFormData(obj)

    expect(data).to.be.an.instanceof(FormData)
    assert.isTrue(data.has('photo'))
    assert.isTrue(data.has('items'))
    assert.isTrue(data.has('username'))
  })
})
