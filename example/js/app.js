import Vue from 'vue';
import VueResource from 'vue-resource';
import VueForm, { AlertError, HasError } from 'vform';

Vue.use(VueForm);
Vue.use(VueResource);

Vue.component('has-error', HasError);
Vue.component('alert-error', AlertError);

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
                .then(({data}) => console.log(data));
        }
    }
});
