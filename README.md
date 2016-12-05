<p align="center">
  <img src="http://i.imgur.com/AcBAPll.gif" width="700" alt="vform">
</p>

# vform

> A simple way to handle form validation in Vue and Laravel. Inspired from [Laravel Spark](https://spark.laravel.com).

## Installation

```bash
npm install --save vform
```

## Usage

### JavaScript

```javascript
import Vue from 'vue'
import axios from 'axios'
import VueForm from 'vform'

Vue.use(VueForm, { http: axios })

new Vue({
  el: '#app',
  
  data () {
    return {
      // Create a new form instance
      form: this.$form({
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
```

If you want to use [vue-resoure](https://github.com/pagekit/vue-resource) then:

```javascript
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueForm, { http: Vue.http })
```

### HTML

```html
<div id="app">
  <form @submit.prevent="login" class="form-horizontal">
    <alert-error :form="form"></alert-error>

    <div class="form-group" :class="{ 'has-error': form.errors.has('username') }">
      <label class="col-md-3 control-label">Username</label>
      <div class="col-md-6">
        <input v-model="form.username" type="text" name="username" class="form-control">
        <has-error :form="form" field="username"></has-error>
      </div>
    </div>

    <div class="form-group" :class="{ 'has-error': form.errors.has('password') }">
      <label class="col-md-3 control-label">Password</label>
      <div class="col-md-6">
        <input v-model="form.password" type="password" name="password" class="form-control">
        <has-error :form="form" field="password"></has-error>
      </div>
    </div>

    <div class="form-group">
      <button :disabled="form.busy" type="submit" class="btn btn-primary">Log In</button>
    </div>
  </form>
</div>
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

See the [example](example) for more. <br>

## Api 

### Form

__Usage:__

```javascript
...
data () {
  return {
    form: this.$form({
      username: '',
      password: '',
      remember: false
    })
  }
},
methods: {
  submit () {
    this.form.post('/someUrl')
      .then(({ data }) => { console.log(data) })
  }
}
...
```

```html
<button :disabled="form.busy" type="submit">Submit</button>
```

__Available methods:__

```javascript
/**
 * Create a new form instance.
 *
 * @param {Object} data
 * @param {Object} mergeData
 */
constructor (data = {}, mergeData = {})

/**
 * Send the from via a POST request.
 *
 * @param  {String} url
 * @return {Promise}
 */
post (url)

/**
 * Send the from via a PATCH request.
 *
 * @param  {String} url
 * @return {Promise}
 */
patch (url, data)

/**
 * Send the from via a GET request.
 *
 * @param  {String} url
 * @return {Promise}
 */
get (url)

/**
 * Get the form data.
 *
 * @return {Object}
 */
getData ()

/**
 * Start processing the form.
 */
startProcessing ()

/**
 * Finish processing the form.
 */
finishProcessing ()

/**
 * Clear the form.
 */
clear ()

/**
 * Reset the form fields.
 */
reset ()
```

__Available properties:__

```javascript
/**
 * Indicates if the form is sent to the server.
 *
 * @var {Boolean}
 */
busy

/**
 * Indicates response form the server was successful.
 *
 * @var {Boolean}
 */
successful

/**
 * Contains the validation errors from the server.
 * 
 * @var {FormErrors}
 */
errors
```


### FormErrors

__Usage:__

```html
<span class="has-error" v-if="form.errors.has('username')">
  <strong>{{ form.errors.get('username') }}</strong>
</span>
```

Or

```html
<has-error :form="form" field="username"></has-error>
```

__Available methods:__

```javascript
/**
 * Determine if the collection has any errors.
 *
 * @return {Boolean}
 */
hasErrors ()

/**
 * Get all of the errors for the collection in a flat array.
 *
 * @return {Array}
 */
flatten ()

/**
 * Determine if the collection has errors for a given field.
 *
 * @param  {String} field
 * @return {Boolean}
 */
has (field)

/**
 * Determine if the collection has errors for a given fields.
 *
 * @return {Boolean}
 */
hasAny ()

/**
 * Get all of the errors for the collection.
 *
 * @return {Object}
 */
all ()

/**
 * Get the first error message for a given field.
 *
 * @return {String|Null}
 */
get (field)

/**
 * Get the first error message for a given fields.
 *
 * @return {Array}
 */
only ()

/**
 * Set the raw errors for the collection.
 *
 * @param {Object}
 */
set (errors)

/**
 * Clear all of the errors from the collection.
 */
clear ()

/**
 * Remove the errors for the given field.
 *
 * @param {String} field
 */
remove (field)
```

### Alerts

```html
<alert-error :form="form"></alert-error>

<alert-errors :form="form"></alert-errors>

<alert-success :form="form" message="Success!"></alert-success>
```

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.
