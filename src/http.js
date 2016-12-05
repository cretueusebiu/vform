import Vue from 'vue';
import Form from './Form';

export default {
    routes: {},
    baseUrl: '',

    /**
     * Make a GET request.
     *
     * @param  {String} url
     * @param  {Object|Form} data
     * @return {Promise}
     */
    get(url, data) {
        return this.send('get', url, data);
    },

    /**
     * Make a POST request.
     *
     * @param  {String} url
     * @param  {Object|Form} data
     * @return {Promise}
     */
    post(url, data) {
        return this.send('post', url, data);
    },

    /**
     * Make a PATCH request.
     *
     * @param  {String} url
     * @param  {Object|Form} data
     * @return {Promise}
     */
    patch(url, data) {
        return this.send('patch', url, data);
    },

    /**
     * Make a DELETE request.
     *
     * @param  {String} url
     * @param  {Object|Form} data
     * @return {Promise}
     */
    delete(url, data) {
        return this.send('delete', url, data);
    },

    /**
     * Make an HTTP request with the form data.
     *
     * @param  {String} method
     * @param  {String} url
     * @param  {Object|Form} data
     * @return {Promise}
     */
    send(method, url, data = {}) {
        return new Promise((resolve, reject) => {
            const form = data instanceof Form ? data : null;

            let body = form ? form.getData() : data;

            if (form) {
                form.startProcessing();
            }

            if (method === 'get') {
                body = {params: body};
            }

            Vue.http[method](this.route(url), body)
                .then((response) => {
                    if (form) {
                        form.finishProcessing();
                    }

                    resolve(response);
                })
                .catch((error) => {
                    const response = error.response ? error.response : error;

                    if (form) {
                        form.busy = false;
                        form.errors.set(Object.assign({}, response.data));
                    }

                    reject(response);
                });
        });
    },

    /**
     * Get a named route.
     *
     * @param  {String} name
     * @return {Object} parameters
     * @return {String}
     */
    route(name, parameters = {}) {
        let url = name;

        if (this.routes.hasOwnProperty(name)) {
            url = decodeURI(this.routes[name]);
        }

        for (let key in parameters) {
            url = url.replace(`{${key}}`, parameters[key]);
        }

        return this.baseUrl + url;
    }
}
