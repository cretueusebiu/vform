import Vue from 'vue';

export default {
    routes: {},
    baseUrl: '',

    /**
     * Send the form data via an HTTP request.
     *
     * @param  {String} method
     * @param  {String} url
     * @param  {Form} form
     * @return {Promise}
     */
    send(method, url, form) {
        return new Promise((resolve, reject) => {
            let body = form.getData();

            form.startProcessing();

            if (method === 'get') {
                body = {params: body};
            }

            Vue.http[method](this.route(url), body)
                .then((response) => {
                    form.finishProcessing();

                    resolve(response);
                }, (response) => {
                    form.busy = false;
                    form.errors.set(Object.assign({}, response.data));

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
