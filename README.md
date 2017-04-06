# vform

<p>
  <a href="https://npmjs.com/package/vform"><img src="https://img.shields.io/npm/v/vform.svg?style=flat-square" alt="Latest Version on NPM"></a>
  <a href="https://travis-ci.org/cretueusebiu/vform"><img src="https://travis-ci.org/cretueusebiu/vform.svg?branch=master" alt="Build Status"></a>
  <a href="https://npmjs.com/package/vform"><img src="https://img.shields.io/npm/dt/vform.svg?style=flat-square" alt="Total Downloads"></a>
</p>

>A simple way to handle Laravel back-end validation in Vue. Inspired from <a href="https://spark.laravel.com">Laravel Spark</a>.

<p align="center">
  <img src="http://i.imgur.com/AcBAPll.gif" width="700" alt="vform">
</p>

## Installation

```bash
npm install --save axios vform
```

## Usage

See the included [example](example).

```vue
<template>
<div id="app">
  <form @submit.prevent="login" @keydown="form.errors.clear($event.target.name)" class="form-horizontal">
    <alert-error :form="form"></alert-error>

    <div class="form-group" :class="{ 'has-error': form.errors.has('username') }">
      <label for="username" class="col-md-3 control-label">Username</label>
      <div class="col-md-6">
        <input v-model="form.username" type="text" name="username" id="username" class="form-control">
        <has-error :form="form" field="username"></has-error>
      </div>
    </div>
  
    <div class="form-group" :class="{ 'has-error': form.errors.has('password') }">
      <label for="password" class="col-md-3 control-label">Password</label>
      <div class="col-md-6">
        <input v-model="form.password" type="password" name="password" id="password" class="form-control">
        <has-error :form="form" field="password"></has-error>
      </div>
    </div>

    <div class="form-group">
      <button :disabled="form.busy" type="submit" class="btn btn-primary">Log In</button>
    </div>
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
      form: Form({
        username: '',
        password: '',
        remember: false
      })
    }
  },

  methods: {
    login () {
      // Submit the form via a POST request
      this.form.post('/auth/login')
        .then(({ data }) => { console.log(data) })
    }
  }
})
</script>
```

### PHP (Laravel Controller)

```php
class AuthController extends Controller
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
 * Submit the from via a POST request.
 *
 * @param  {String} url
 * @return {Promise}
 */
post (url)

/**
 * Submit the from via a PATCH request.
 *
 * @param  {String} url
 * @return {Promise}
 */
patch (url)

/**
 * Submit the from via a GET request.
 *
 * @param  {String} url
 * @return {Promise}
 */
get (url)

/**
 * Clear the form errors.
 */
clear ()

/**
 * Reset the form fields.
 */
reset ()
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
 * Get the error message for the given field.
 *
 * @param  String} field
 * @return {String|undefined}
 */
get (field)

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
```

### Bootstrap Alert Components

```javascript
import { 
  HasError,
  HasError4,
  AlertError,
  AlertErrors, 
  AlertSuccess
} from 'vform'

Vue.component(HasError.name, HasError)
// Vue.component(HasError4.name, HasError4) // Bootstrap 4
Vue.component(AlertError.name, AlertError)
Vue.component(AlertErrors.name, AlertErrors)
Vue.component(AlertSuccess.name, AlertSuccess)
```

```html
<!-- .help-block / .form-control-feedback with the error message -->
<has-error :form="form" field="username"></has-error>

<!-- Danger alert with a message -->
<alert-error :form="form" message="There were some problems with your input."></alert-error>

<!-- Danger alert with message and the list of errors -->
<alert-errors :form="form" message="There were some problems with your input."></alert-errors>

<!-- Success alert with message -->
<alert-success :form="form" message="Success!"></alert-success>
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.
