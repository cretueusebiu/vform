import test from 'ava'
import { deepCopy, hasFile, toFormData } from '../src/util'

test('it can deep copy a plain object', t => {
  const obj = { a: { b: { c: 1 }}}
  const copy = deepCopy(obj)
  obj.a.b.c = 2

  t.is(copy.a.b.c, 1)
  t.deepEqual(copy, { a: { b: { c: 1 }}})
})

test('it can determine if the object contains any files', t => {
  t.false(hasFile({ username: 'foo' }))
  t.true(hasFile({ photo: new Blob([new Uint8Array(10)], { type: 'image/png' }) }))
})

test('it can convert a plain object to a FormData object', t => {
  const obj = {
    username: 'foo',
    photo: new Blob([new Uint8Array(10)], { type: 'image/png' }),
    items: [{ name: 'item 1' }, { name: 'item 2' }]
  }

  const data = toFormData(obj)

  t.true(data instanceof FormData)
  t.true(data.has('photo'))
  t.true(data.has('items'))
  t.true(data.has('username'))
})
