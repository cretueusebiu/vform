import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import Errors from './Errors';
interface Progress {
    total: number;
    loaded: number;
    percentage: number;
}
declare class Form {
    [key: string]: any;
    originalData: Record<string, any>;
    /**
     * Indicates if the form is sent to the server.
     */
    busy: boolean;
    /**
     * Indicates if the response form the server was successful.
     */
    successful: boolean;
    /**
     * The validation errors from the server.
     */
    errors: Errors;
    /**
     * The upload progress object.
     */
    progress: Progress | undefined;
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
     * Update the form data.
     */
    update(data: Record<string, any>): void;
    /**
     * Fill the form data.
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
     * Reset the form data.
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
    submit(method: string, url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    /**
     * Handle the errors.
     */
    handleErrors(error: AxiosError): void;
    /**
     * Extract the errors from the response object.
     */
    extractErrors(response: AxiosResponse): Record<string, any>;
    /**
     * Handle the upload progress.
     */
    handleUploadProgress(event: ProgressEvent): void;
    /**
     * @deprecated
     */
    route(name: string, parameters?: any): string;
    /**
     * Clear errors on keydown.
     */
    onKeydown(event: KeyboardEvent): void;
}
export default Form;
