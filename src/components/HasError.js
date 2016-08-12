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
        <span class="has-error" v-if="form.errors.has(field)">
            {{ form.errors.get(field) }}
        </span>
    `
}
