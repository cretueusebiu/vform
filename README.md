<p align="center">
  <img src="https://i.imgur.com/0IX1Otl.gif" width="700" alt="vform">
</p>

# Handle Laravel-Vue forms and validation with ease

<p>
  <a href="https://npmjs.com/package/vform"><img src="https://img.shields.io/npm/v/vform.svg?style=flat-square" alt="Latest Version on NPM"></a>
  <a href="https://github.com/cretueusebiu/vform/actions"><img src="https://github.com/cretueusebiu/vform/workflows/test/badge.svg" alt="Build Status"></a>
  <a href="https://npmjs.com/package/vform"><img src="https://img.shields.io/npm/dt/vform.svg?style=flat-square" alt="Total Downloads"></a>
</p>

`vform` is a tiny library for Vue 2/3 to help with forms and validation when using Laravel as a back-end.

It provides a form instance to wrap your data in a convenient way and send it to your Laravel application via an HTTP request using `axios`.

## Installation

```bash
npm install axios vform
```

## Basic Usage

```html
<template>
  <form @submit.prevent="login" @keydown="form.onKeydown($event)">
    <input v-model="form.username" type="text" name="username" placeholder="Username">
    <div v-if="form.errors.has('username')" v-html="form.errors.get('username')" />

    <input v-model="form.password" type="password" name="password" placeholder="Password">
    <div v-if="form.errors.has('password')" v-html="form.errors.get('password')" />

    <button type="submit" :form="form" :disabled="form.busy">
      Log In
    </button>
  </form>
</template>

<script>
import Form from 'vform'
import { HasError } from 'vform/components/bootstrap5'

export default {
  components: {
    HasError
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

## Documentation

You'll find the documentation on [vform.vercel.app](https://vform.vercel.app).

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.
