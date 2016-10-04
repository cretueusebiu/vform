# Changelog

## 0.4.5 - 2016-10-04

- Add `Form.set(data = {})` to set mutiple form fields

## 0.4.4 - 2016-10-03

- Fix `FormErrors.flatten` when there are no errors
- `FormErrors.hasAny` can be called without any args to check if any errors exist

## 0.4.0 - 2016-09-17

- Removed `Form.baseUrl`
- Remove call to `Form.clear()` in `Form.reset()`
- To register the alert components use `Use Vue.use(vForm, {components: true})`.
