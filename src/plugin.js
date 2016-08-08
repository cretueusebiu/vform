import Form from './Form';

function create(data = {}, merge = {}) {
    return new Form(data, merge)
}

export default {
    install: function (Vue, options = {}) {
        if (options.routes) {
            Form.routes(options.routes);
        }

        if (options.baseUrl) {
            Form.baseUrl(options.baseUrl);
        }

        Vue.form = create;
        Vue.prototype.$form = create;
    }
}
