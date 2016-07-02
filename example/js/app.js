import Vue from 'vue';
import VueResource from 'vue-resource';
import {http, Form, AlertError} from 'vform';

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
            http.post('server.php', this.form)
                .then(({data}) => console.log(data));
        }
    }
});
