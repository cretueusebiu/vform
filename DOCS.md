# Documentation

- [Usage](#usage)
    + [JavaScript](#javascript)
    + [HTML](#html)
    + [PHP](#php-laravel)
- [API](#api)
    + [Form](#Form)
    + [FormErrors](#FormErrors)
    + [http](#http)
    + [Alerts](#alerts)

## Usage

### JavaScript

```javascript
import Vue from 'vue';
import VueResource from 'vue-resource';
import {http, Form, AlertError} from 'vform';

// Install vue-resource
Vue.use(VueResource);

new Vue({
    el: '#app',

    components: {AlertError},

    data: {
        // Define the form
        form: new Form({
            username: '',
            password: ''
        })
    },

    methods: {
        login() {
            // Submit the form
            http.post('server.php', this.form)
                .then(({data}) => console.log(data));
        }
    }
});
```

### HTML

```html
<form v-on:submit.prevent="login" class="form-horizontal">
    <alert-error :form="form"></alert-error>

    <div class="form-group">
        <label class="col-md-3 control-label">Username</label>
        <div class="col-md-6">
            <input v-model="form.username" type="text" name="username" class="form-control">
            <span class="has-error" v-if="form.errors.has('username')">
                <strong>{{ form.errors.get('username') }}</strong>
            </span>
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-3 control-label">Password</label>
        <div class="col-md-6">
            <input v-model="form.password" type="password" name="password" class="form-control">
            <span class="has-error" v-if="form.errors.has('password')">
                <strong>{{ form.errors.get('password') }}</strong>
            </span>
        </div>
    </div>

    <div class="form-group">
        <button :disabled="form.busy" type="submit" class="btn btn-primary">Log In</button>
    </div>
</form>
```

### PHP (Laravel)

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

__Usage:__

```javascript
import {http, Form} from 'vform';

const myform = new Form({
    username: '',
    password: ''
});

http.post('/someUrl', myform)
    .then(({data}) => console.log(data));
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
constructor(data = {}, mergeData = {})

/**
 * Get the form data.
 *
 * @return {Object}
 */
getData()

/**
 * Start processing the form.
 */
startProcessing()

/**
 * Finish processing the form.
 */
finishProcessing()

/**
 * Clear the form.
 */
clear()

/**
 * Reset the form fields.
 */
reset()
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

__Available methods:__

```javascript
/**
 * Determine if the collection has any errors.
 *
 * @return {Boolean}
 */
hasErrors()

/**
 * Get all of the errors for the collection in a flat array.
 *
 * @return {Array}
 */
flatten()

/**
 * Determine if the collection has errors for a given field.
 *
 * @param  {String} field
 * @return {Boolean}
 */
has(field)

/**
 * Determine if the collection has errors for a given fields.
 *
 * @return {Boolean}
 */
hasAny()

/**
 * Get all of the errors for the collection.
 *
 * @return {Object}
 */
all()

/**
 * Get the first error message for a given field.
 *
 * @return {String|Null}
 */
get(field)

/**
 * Get the first error message for a given fields.
 *
 * @return {Array}
 */
only()

/**
 * Set the raw errors for the collection.
 *
 * @param {Object}
 */
set(errors)

/**
 * Clear all of the errors from the collection.
 */
clear()
```

### http

__Usage:__

```javascript
import {http} from 'vform';

http.post('/someUrl', {some: 'param'})
    .then(({data}) => console.log(data));
```

__Available methods:__

```javascript
/**
 * Make a GET request.
 *
 * @param  {String} url
 * @param  {Object|Form} data
 * @return {Promise}
 */
get(url, data)

/**
 * Make a POST request.
 *
 * @param  {String} url
 * @param  {Object|Form} data
 * @return {Promise}
 */
post(url, data)

/**
 * Make a PATCH request.
 *
 * @param  {String} url
 * @param  {Object|Form} data
 * @return {Promise}
 */
patch(url, data)

/**
 * Make a DELETE request.
 *
 * @param  {String} url
 * @param  {Object|Form} data
 * @return {Promise}
 */
delete(url, data)

/**
 * Make a HTTP request with the form data.
 *
 * @param  {String} method
 * @param  {String} url
 * @param  {Object|Form} data
 * @return {Promise}
 */
send(method, url, data = {})
```

### Alerts

Bootstrap alerts.

```javascript
import {AlertError, AlertErrors, AlertSuccess} from 'vform';

Vue.component('alert-error', AlertError);
Vue.component('alert-errors', AlertErrors);
Vue.component('alert-success', AlertSuccess);
```

```html
<alert-error :form="form"></alert-error>

<alert-errors :form="form"></alert-errors>

<alert-success :form="form" message="Success!"></alert-success>
```
