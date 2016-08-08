export default {
    props: {
        form: {
            type: Object,
            required: true
        },
        field: {
            type: String,
            required: true
        }
    },

    template: `
        <span class="has-error" v-if="this.form.errors.has(this.field)">
            {{ this.form.errors.get(this.field) }}
        </span>
    `
}
