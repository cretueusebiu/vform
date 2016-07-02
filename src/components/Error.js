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
            <template v-if="form.errors.has('error')">{{ form.errors.get('error') }}</template>
            <template v-else>{{ message }}</template>
        </div>
    `
}
