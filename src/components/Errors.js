import Mixin from './Mixin';

export default {
    mixins: [Mixin],

    props: {
        message: {
            type: String,
            default() {
                return 'There were some problems with your input.';
            }
        }
    },

    template: `
        <div class="alert alert-danger" :class="{dismissible: dismissible}" v-if="form.errors && form.errors.hasErrors()" v-on:click="dismiss">
            <template v-if="message">{{ message }}</template>
            <ul>
                <li v-for="error in form.errors.flatten()">{{{ error }}}</li>
            </ul>
        </div>
    `
}
