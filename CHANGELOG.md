# Changelog

## 0.7.5 - 2017-05-19

- Check for a response before extracting errors.

## 0.7.4 - 2017-04-06

- Require `axios` as peer dependency.

## 0.7.3 - 2017-03-08

- Add `name` to components.
- Rename lib window name from `vForm` to `vform`.

## 0.7.1 - 2017-02-14

- Switch to [AVA](https://github.com/avajs/ava) tests.
- Export in UMD format.
- Use [vue-cli](https://github.com/vuejs/vue-cli) for the build process.

## 0.7.0 - 2017-01-07

- Removed support as a Vue plugin;`vform` now exports the `Form` class as default.
- Dropped support for [vue-resoure](https://github.com/pagekit/vue-resource), [axios](https://github.com/mzabriskie/axios) is now used by default.
- Renamed `Form.prototype.send()` to `Form.prototype.submit()`.
- Renamed `Form.prototype.getData()` to `Form.prototype.data()`.
- Renamed class `FormErrors` to `Errors`.
- Renamed `Errors.prototype.hasErrors()` to `Errors.prototype.any()`
- Removed `Errors.prototype.remove(field)` in favor of `Errors.prototype.clear(field)`.
- Added tests.

## 0.6.0 - 2016-12-08

- Changed how `Form.prototype.reset()` works. The form keeps now a copy of the original data.
- Removed `mergeData` arg (`new Form(data = {}, mergeData = {})`).

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
