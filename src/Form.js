import http from './http';
import FormErrors from './FormErrors';

export default class Form {
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

        for (let key in this) {
            if (this.hasOwnProperty(key) && ignore.indexOf(key) < 0) {
                data[key] = this[key];
            }
        }

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

        for (let key in this.getData()) {
            this[key] = '';
        }
    }

    /**
     * Send the from via a GET request.
     *
     * @param  {String} url
     * @return {Promise}
     */
    get(url) {
        return http.send('get', url, this);
    }

    /**
     * Send the from via a POST request.
     *
     * @param  {String} url
     * @return {Promise}
     */
    post(url) {
        return http.send('post', url, this);
    }

    /**
     * Send the from via a PATCH request.
     *
     * @param  {String} url
     * @return {Promise}
     */
    patch(url) {
        return http.send('patch', url, this);
    }

    /**
     * Set / Get http base url.
     *
     * @param  {String|null} url
     * @return {String|null}
     */
    static baseUrl(url = null) {
        if (url) {
            http.baseUrl = url;
        }

        return http.baseUrl;
    }

    /**
     * Set / Get http routes.
     *
     * @param  {String|null} url
     * @return {String|null}
     */
    static routes(routes = null) {
        if (routes) {
            http.routes = routes;
        }

        return http.routes;
    }
}
