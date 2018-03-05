# vform

<p>
  <a href="https://npmjs.com/package/vform"><img src="https://img.shields.io/npm/v/vform.svg?style=flat-square" alt="Latest Version on NPM"></a>
  <a href="https://travis-ci.org/cretueusebiu/vform"><img src="https://img.shields.io/travis/cretueusebiu/vform/master.svg?style=flat-square" alt="Build Status"></a>
  <a href="https://npmjs.com/package/vform"><img src="https://img.shields.io/npm/dt/vform.svg?style=flat-square" alt="Total Downloads"></a>
</p>

>A simple way to handle Laravel back-end validation in Vue. Inspired from <a href="https://spark.laravel.com">Laravel Spark</a>.

<p align="center">
  <img src="http://i.imgur.com/AcBAPll.gif" width="700" alt="vform">
</p>

## Installation

```bash
npm i axios vform
```

## Usage

See the included [examples](example).

__Bootstrap 4 Markup:__

```vue
<template>
<div id="app">
  <form @submit.prevent="login" @keydown="form.onKeydown($event)">
    <div class="form-group">
      <label>Username</label>
      <input v-model="form.username" type="text" name="username"
        class="form-control" :class="{ 'is-invalid': form.errors.has('username') }">
      <has-error :form="form" field="username"></has-error>
    </div>

    <div class="form-group">
      <label>Password</label>
      <input v-model="form.password" type="password" name="password"
        class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
      <has-error :form="form" field="password"></has-error>
    </div>

    <button :disabled="form.busy" type="submit" class="btn btn-primary">Log In</button>
  </form>
</div>  
</template>

<script>
import Vue from 'vue'
import { Form, HasError, AlertError } from 'vform'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

new Vue({
  el: '#app',
  
  data () {
    return {
      // Create a new form instance
      form: new Form({
        username: '',
        password: '',
        remember: false
      })
    }
  },

  methods: {
    login () {
      // Submit the form via a POST request
      this.form.post('/login')
        .then(({ data }) => { console.log(data) })
    }
  }
})
</script>
```

__Laravel Controller:__

```php
class LoginController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'username' => 'required',
            'password' => 'required',
        ]);

        // ...
    }
}
```

## Api 

### Form

```javascript
/**
 * Indicates if the form is sent to the server.
 *
 * @var {Boolean}
 */
busy

/**
 * Indicates if the response form the server was successful.
 *
 * @var {Boolean}
 */
successful

/**
 * Contains the validation errors from the server.
 * 
 * @var {Errors}
 */
errors

/**
 * Create a new form instance.
 *
 * @param {Object} data
 */
constructor (data = {})

/**
 * Submit the from via a POST|PATCH|PUT|DELETE|GET request.
 *
 * @param  {String} url
 * @return {Promise}
 */
post|patch|put|delete|get (url)

/**
 * Clear the form errors.
 */
clear ()

/**
 * Reset the form fields.
 */
reset ()

/**
 * Fill form data.
 *
 * @param {Object} data
 */
fill (data)
```

### Errors

```javascript
/**
 * Get all the errors.
 *
 * @return {Object}
 */
all ()

/**
 * Determine if there is an error for the given field.
 *
 * @param  {String} field
 * @return {Boolean}
 */
has (field)

/**
 * Determine if there are any errors for the given fields.
 *
 * @param  {...String} fields
 * @return {Boolean}
 */
hasAny (...fields)

/**
 * Determine if there are any errors.
 *
 * @return {Boolean}
 */
any ()

/**
 * Get the first error message for the given field.
 *
 * @param  String} field
 * @return {String|undefined}
 */
get (field)

/**
 * Get all the error messages for the given field.
 *
 * @param  {String} field
 * @return {Array}
 */
getAll (field)

/**
 * Get the error message for the given fields.
 *
 * @param  {...String} fields
 * @return {Array}
 */
only (...fields)

/**
 * Get all the errors in a flat array.
 *
 * @return {Array}
 */
flatten ()

/**
 * Clear one or all error fields.
 *
 * @param {String|undefined} field
 */
clear (field)

/**
 * Set the errors object.
 *
 * @param {Object}
 */
set (errors)

/**
 * Set a specified error message.
 *
 * @param {String}
 * @param {String}
 */
set (field, message)
```

## Bootstrap Components

Components for Bootstrap 3 and 4.

```javascript
import { 
  HasError,
  AlertError,
  AlertErrors, 
  AlertSuccess
} from 'vform'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component(AlertErrors.name, AlertErrors)
Vue.component(AlertSuccess.name, AlertSuccess)
```

### has-error

Display the validation error for a field.

```html
<!-- Bootstrap 4 -->
<div class="form-group">
  <label>Username</label>
  <input v-model="form.username" type="text" name="username"
    class="form-control" :class="{ 'is-invalid': form.errors.has('username') }">
  <has-error :form="form" field="username"></has-error>
</div>

<!-- Bootstrap 3 -->
<div class="form-group" :class="{ 'has-error': form.errors.has('username') }">
  <label>Username</label>
  <input v-model="form.username" type="text" name="username" class="form-control">
  <has-error :form="form" field="username"></has-error>
</div>
```

### alert-error

Show a danger alert if there are any errors.

```html
<alert-error :form="form" message="There were some problems with your input."></alert-error>
```

### alert-errors

Show a danger alert with the list of errors for each field.

```html
<alert-errors :form="form" message="There were some problems with your input."></alert-errors>
<!-- Or -->
<alert-errors :form="form">There were some problems with your input.</alert-errors>
```

### alert-success

Show a success alert on a successful request.

```html
<alert-success :form="form" message="Your changes have been saved!"></alert-success>
<!-- Or -->
<alert-success :form="form">Your changes have been saved!</alert-success>
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.
