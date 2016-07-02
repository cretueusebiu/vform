import Mixin from './Mixin';

export default {
    mixins: [Mixin],

    props: {
        message: {
            type: String,
            required: true
        }
    },

    template: `
        <div class="alert alert-success" :class="{dismissible: dismissible}" v-if="form.successful" v-on:click="dismiss">
            {{ message }}
        </div>
    `
}
