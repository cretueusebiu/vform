import Vue from 'vue';
import VueResource from 'vue-resource';
import {Form, AlertError} from 'vform';

Vue.use(VueResource);

new Vue({
    el: '#app',

    components: {AlertError},

    data: {
        form: new Form({
            username: '',
            password: '',
            remember: false
        })
    },

    methods: {
        login() {
            this.form.post('server.php')
                .then(({data}) => console.log(data));
        }
    }
});
