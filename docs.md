## Getting started

### Installation

#### via npm

```bash
npm install --save vform
```

#### via CDN

```html
<script src="https://unpkg.com/vform@2.0.0"></script>
```

### Basic Usage

_(example for Bootstrap 5)_

```html
<template>
  <form method="POST" @submit.prevent="login" @keydown="form.onKeydown($event)">
    <AlertError :form="form" />

    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input id="email" v-model="form.email" type="email" name="email" class="form-control">
      <HasError :form="form" field="email" />
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
import { HasError, AlertError, Button } from 'vform/components/bootstrap5'

export default {
  components: {
    Button,
    HasError,
    AlertError
  },

  data () {
    return {
      form: Form.make({
        email: '',
        password: ''
      })
    }
  },

  methods: {
    async login () {
      await this.form.post('/api/login')
      // ...
    }
  }
}
</script>
```

## Examples

wip
