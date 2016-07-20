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
}
