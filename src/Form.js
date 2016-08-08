import Vue from 'vue';
import FormErrors from './FormErrors';

class Form {
    /**
     * Create a new form instance.
     *
     * @param {Object} data
     * @param {Object} mergeData
     */
    constructor(data = {}, mergeData = {}) {
        Object.assign(this, data, mergeData);

        this.busy = false;
        this.successful = false;
        this.errors = new FormErrors();
    }

    /**
     * Get the form data.
     *
     * @return {Object}
     */
    getData() {
        const data = {};
        const ignore = ['busy', 'successful', 'errors', 'forms'];

        Object.keys(this).forEach(key => {
            if (!ignore.includes(key)) {
                data[key] = this[key];
            }
        });

        return data;
    }

    /**
     * Start processing the form.
     */
    startProcessing() {
        this.errors.clear();
        this.busy = true;
        this.successful = false;
    }

    /**
     * Finish processing the form.
     */
    finishProcessing() {
        this.busy = false;
        this.successful = true;
    }

    /**
     * Clear the form.
     */
    clear() {
        this.errors.clear();
        this.successful = false;
    }

    /**
     * Reset the form fields.
     */
    reset() {
        this.clear();

        Object.keys(this).forEach(key => this[key] = '');
    }

    /**
     * Send the from via a GET request.
     *
     * @param  {String} url
     * @return {Promise}
     */
    get(url) {
        return this.send('get', url);
    }

    /**
     * Send the from via a POST request.
     *
     * @param  {String} url
     * @return {Promise}
     */
    post(url) {
        return this.send('post', url);
    }

    /**
     * Send the from via a PATCH request.
     *
     * @param  {String} url
     * @return {Promise}
     */
    patch(url) {
        return this.send('patch', url);
    }

    /**
     * Send the from via a PUT request.
     *
     * @param  {String} url
     * @return {Promise}
     */
    put(url) {
        return this.send('put', url);
    }

    /**
     * Send the form data via an HTTP request.
     *
     * @param  {String} method (get, post, patch, put)
     * @param  {String} url
     * @return {Promise}
     */
    send(method, url) {
        this.startProcessing();

        let body = this.getData();

        if (this.hasFile(body)) {
            body = this.toFormData(body);
        }

        if (method === 'get') {
            body = {params: body};
        }

        return new Promise((resolve, reject) => {
            Vue.http[method](this.route(url), body)
                .then((response) => {
                    this.finishProcessing();

                    resolve(response);
                }, (response) => {
                    this.busy = false;
                    this.errors.set(Object.assign({}, response.data));

                    reject(response);
                });
        });
    }

    /**
     * Determinte if the given object has any files.
     *
     * @param  {Object} obj
     * @return {Boolean}
     */
    hasFile(obj) {
        return Object.keys(obj).some(key =>
            obj[key] instanceof File || obj[key] instanceof FileList
        );
    }

    /**
     * Convert the given object to a FormData instance.
     *
     * @param  {Object} obj
     * @return {FormData}
     */
    toFormData(obj) {
        const data = new FormData();

        Object.keys(obj).forEach(key => {
            let value = obj[key];

            if (value instanceof FileList) {
                for (let i = 0; i < value.length; i++) {
                    data.append(`${key}[]`, value.item(i));
                }
            } else {
                data.append(key, value);
            }
        });

        return data;
    }

    /**
     * Get a named route.
     *
     * @param  {String} name
     * @return {Object} parameters
     * @return {String}
     */
    route(name, parameters = {}) {
        let url = name;

        if (Form.routes.hasOwnProperty(name)) {
            url = decodeURI(Form.routes[name]);
        }

        if (typeof parameters !== 'object') {
            parameters = {id: parameters};
        }

        Object.keys(parameters).forEach(key => {
            url = url.replace(`{${key}}`, parameters[key]);
        });

        return Form.baseUrl + url;
    }

    /**
     * Set the base url.
     *
     * @param {String} url
     */
    static baseUrl(url) {
        Form.baseUrl = url;
    }

    /**
     * Set named routes.
     *
     * @param {Object} routes
     */
    static routes(routes) {
        Form.routes = routes;
    }
}

Form.routes = {};
Form.baseUrl = '';

export default Form;
