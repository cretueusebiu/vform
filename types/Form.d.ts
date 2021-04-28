import { Method, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Errors from './Errors';
declare class Form {
    busy: boolean;
    successful: boolean;
    errors: Errors;
    private originalData;
    static axios: AxiosInstance;
    static routes: Record<string, string>;
    static errorMessage: string;
    static ignore: string[];
    /**
     * Create a new form instance.
     */
    constructor(data?: Record<string, any>);
    /**
     * Create a new form instance.
     */
    static make<T extends typeof Form, U>(this: T, augment?: U): InstanceType<T> & U;
    /**
     * Fill form data.
     */
    fill(data?: Record<string, any>): void;
    /**
     * Get the form data.
     */
    data(): Record<string, any>;
    /**
     * Get the form data keys.
     */
    keys(): string[];
    /**
     * Start processing the form.
     */
    startProcessing(): void;
    /**
     * Finish processing the form.
     */
    finishProcessing(): void;
    /**
     * Clear the form errors.
     */
    clear(): void;
    /**
     * Reset the form fields.
     */
    reset(): void;
    /**
     * Submit the form via a GET request.
     */
    get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    /**
     * Submit the form via a POST request.
     */
    post(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    /**
     * Submit the form via a PATCH request.
     */
    patch(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    /**
     * Submit the form via a PUT request.
     */
    put(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    /**
     * Submit the form via a DELETE request.
     */
    delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    /**
     * Submit the form data via an HTTP request.
     */
    submit(method: Method, url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    /**
     * Extract the errors from the response object.
     */
    extractErrors(response: AxiosResponse): Record<string, any>;
    /**
     * Get a named route.
     */
    route(name: string, parameters?: any): string;
    /**
     * Clear errors on keydown.
     */
    onKeydown(event: KeyboardEvent): void;
}
export default Form;
