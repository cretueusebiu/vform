## Getting Started

`vform` is a tiny library for Vue 2/3 to help with forms and validation when using Laravel as a back-end.

It provides a form instance to wrap your data in a convenient way and send it to your Laravel application via an HTTP request using `axios`.

### Installation

```bash
npm install axios vform
```

### Basic Usage

```html
<template>
<form @submit.prevent="login" @keydown="form.onKeydown($event)">
  <input v-model="form.username" type="text" name="username" placeholder="Username">
  <div v-if="form.errors.has('username')" v-html="form.errors.get('username')" />

  <input v-model="form.password" type="password" name="password" placeholder="Password">
  <div v-if="form.errors.has('password')" v-html="form.errors.get('password')" />

  <button type="submit" :disabled="form.busy">
    Log In
  </button>
</form>
</template>

<script>
import Form from 'vform'

export default {
  data: () => ({
    form: new Form({
      username: '',
      password: ''
    })
  }),

  methods: {
    async login () {
      const response = await this.form.post('/api/login')
      // ...
    }
  }
}
</script>
```

__Laravel Controller:__

```php
<?php

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

#### Creating an instance

```js
import Form from 'vform'

const form = new Form({ ... })
```

#### Instance properties

```ts
/**
 * Indicates if the form is sent to the server.
 */
form.busy: boolean

/**
 * Indicates if the response form the server was successful.
 */
form.successful: boolean

/**
 * The validation errors from the server.
 */
form.errors: Errors

/**
 * The upload progress object.
 */
form.progress: { total: number, loaded: number, percentage: number } | undefined
```

#### Instance methods

```ts
/**
 * Submit the form data via an HTTP request.
 */
form.submit(method: string, url: string, config = {})
form.post|patch|put|delete|get(url: string, config = {})

/**
 * Clear the form errors.
 */
form.clear()

/**
 * Reset the form data.
 */
form.reset()

/**
 * Update the form data.
 */
form.update({ ... })

/**
 * Fill the form data.
 */
form.fill({ ... })

/**
 * Clear errors on keydown.
 */
form.onKeydown(event: KeyboardEvent)
```

#### Setting a custom axios instance

```js
const instance = axios.create({
   baseURL: 'https://some-domain.com/api/'
})

Form.axios = instance
```

### Errors

```js
const form = new Form({})
const errors = form.errors
```

#### Instance methods

```ts
/**
 * Get all the errors.
 */
errors.all()

/**
 * Determine if there is an error for the given field.
 */
errors.has(field: string): boolean

/**
 * Determine if there are any errors for the given fields.
 */
errors.hasAny(...fields: string[]): boolean

/**
 * Determine if there are any errors.
 */
errors.any(): boolean

/**
 * Get the first error message for the given field.
 */
errors.get(field: string): string|undefined

/**
 * Get all the error messages for the given field.
 */
errors.getAll(field: string): string[]

/**
 * Get the error message for the given fields.
 */
errors.only(...fields: string[]): string[]

/**
 * Get all the errors in a flat array.
 */
errors.flatten(): string[]

/**
 * Clear one or all error fields.
 */
errors.clear(field: string|undefined)

/**
 * Set the errors object.
 */
errors.set(errors = {})

/**
 * Set a specified error message.
 */
errors.set(field: string, message: string)
```

## Components

vform includes a few components for Bootstrap and Tailwind to display the validation errors your Laravel application.

```javascript
import {
  Button,
  HasError,
  AlertError,
  AlertErrors,
  AlertSuccess
} from 'vform/src/components/bootstrap5'
// 'vform/src/components/bootstrap4'
// 'vform/src/components/tailwind'

Vue.component(Button.name, Button)
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component(AlertErrors.name, AlertErrors)
Vue.component(AlertSuccess.name, AlertSuccess)
```

#### HasError

Display the validation error for a field.

```html
<HasError :form="form" field="username" />
```

#### AlertError

Show a danger alert if there are any validation errors.

```html
<AlertError :form="form" message="There were some problems with your input." />
<!-- or -->
<AlertError :form="form">There were some problems with your input.</AlertError>
```

#### AlertErrors

Show a danger alert with the list of validation errors for each field.

```html
<AlertErrors :form="form" message="There were some problems with your input." />
<!-- or -->
<AlertErrors :form="form">There were some problems with your input.</AlertErrors>
```

#### AlertSuccess

Show a success alert on a successful request.

```html
<AlertSuccess :form="form" message="Your changes have been saved!" />
<!-- or -->
<AlertSuccess :form="form">Your changes have been saved!</AlertSuccess>
```

#### Button

A submit button with a spinner.

```html
<Button :form="form">Submit</Button>
```

### Bootstrap

```html
<template>
<form @submit.prevent="login" @keydown="form.onKeydown($event)">
  <AlertError :form="form" />
  <!-- <AlertErrors :form="form" /> -->
  <!-- <AlertSuccess :form="form" message="Your changes have beend saved!" /> -->

  <div class="mb-3">
    <label for="username" class="form-label">username</label>
    <input id="username" v-model="form.username" type="text" name="username" class="form-control">
    <HasError :form="form" field="username" />
  </div>

  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input id="password" v-model="form.password" type="password" name="password" class="form-control">
    <HasError :form="form" field="password" />
  </div>

  <Button :form="form" class="btn btn-primary">
    Log In
  </Button>
</form>
</template>

<script>
import Form from 'vform'
import { Button, HasError, AlertError } from 'vform/src/components/bootstrap5'

export default {
  components: {
    Button, HasError, AlertError
  },

  data: () => ({
    form: new Form({
      username: '',
      password: ''
    })
  }),

  methods: {
    async login () {
      const response = await this.form.post('/api/login')
      // ...
    }
  }
}
</script>
```

### Tailwind

```html
<template>
<form method="POST" @submit.prevent="login" @keydown="form.onKeydown($event)">
  <AlertError :form="form" />
  <!-- <AlertErrors :form="form" /> -->
  <!-- <AlertSuccess :form="form" message="Your changes have beend saved!" /> -->

  <div class="mb-3">
    <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
    <div class="mt-1">
      <input
        id="username"
        v-model="form.username"
        type="text"
        name="username"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      >
    </div>
    <HasError :form="form" field="username" />
  </div>

  <div class="mb-3">
    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
    <div class="mt-1">
      <input
        id="password"
        v-model="form.password"
        type="text"
        name="password"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      >
    </div>
    <HasError :form="form" field="password" />
  </div>

  <Button :form="form" class="px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    Log In
  </Button>
</form>
</template>

<script>
import Form from 'vform'
import { Button, HasError, AlertError } from 'vform/src/components/tailwind'

export default {
  components: {
    Button, HasError, AlertError
  },

  data: () => ({
    form: new Form({
      username: '',
      password: ''
    })
  }),

  methods: {
    async login () {
      const response = await this.form.post('/api/login')
      // ...
    }
  }
}
</script>
```

## Examples

### File Upload

```html
<template>
<form @submit.prevent="submit" @keydown="form.onKeydown($event)">
  <input v-model="form.name" type="text" name="name">
  <HasError :form="form" field="name" />

  <input type="file" name="file" @change="handleFile">
  <HasError :form="form" field="file" />

  <div v-if="form.progress">Progress: {{ form.progress.percentage }}%</div>

  <button type="submit">Submit</button>
</form>
</template>

<script>
import Form from 'vform'
import { HasError } from 'vform/src/components/bootstrap5'

export default {
  components: { HasError },

  data: () => ({
    form: Form.make({
      name: '',
      file: null
    })
  }),

  methods: {
    handleFile (event) {
      // We'll grab just the first file...
      // You can also do some client side validation here.
      const file = event.target.files[0]

      // Set the file object onto the form...
      this.form.file = file
    },

    async submit () {
      const response = await this.form.post('/upload', {
        // onUploadProgress: e => console.log(e) }
      })

      // ...
    }
  }
}
</script>
```
