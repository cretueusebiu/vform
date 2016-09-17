import Vue from 'vue'
import VueForm from 'vform'
import VueResource from 'vue-resource'

Vue.use(VueForm, {components: true, bs4: window.bs4})
Vue.use(VueResource)

new Vue({
  el: '#app',

  data() {
    return {
      form: this.$form({
        username: '',
        password: '',
        remember: false
      })
    }
  },

  methods: {
    login() {
      this.form.post('server.php')
        .then(({data}) => console.log(data))
    }
  }
})
