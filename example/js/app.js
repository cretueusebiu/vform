import Vue from 'vue'
import axios from 'axios'
import VueForm from 'vform'
// import VueResource from 'vue-resource'

// Vue.use(VueResource)

Vue.use(VueForm, { http: axios, bs4: window.bs4 })
// Vue.use(VueForm, { http: Vue.http, bs4: window.bs4 })

new Vue({
  el: '#app',

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
    login () {
      this.form.post('server.php')
        .then(({ data }) => console.log(data))
    }
  }
})
