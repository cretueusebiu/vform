# Changelog

## 0.5.0 - 2016-12-05

- Added support for [axios](https://github.com/mzabriskie/axios).
- An http client must now be set via the `http` option. Supported: [axios](https://github.com/mzabriskie/axios) or [vue-resoure](https://github.com/pagekit/vue-resource).
- The `components` option is set to `true` by default.
- Added `FormErrors.prototype.remove(String field)` to remove the errors for the given field.
- Removed `Form.routes()` method.

## 0.4.5 - 2016-10-04

- Added `Form.prototype.set(Object data)` to set mutiple form fields

## 0.4.4 - 2016-10-03

- Fixed `FormErrors.flatten` when there are no errors
- `FormErrors.hasAny` can be called without any args to check if any errors exist

## 0.4.0 - 2016-09-17

- Removed `Form.baseUrl`
- Removed call to `Form.clear()` in `Form.reset()`
- To register the alert components use `Use Vue.use(vForm, {components: true})`.
