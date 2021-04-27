export default class Errors {
    private errors;
    /**
     * Create a new error bag instance.
     */
    constructor();
    /**
     * Set the errors object or field error messages.
     */
    set(field: string | Record<string, any>, messages?: any): void;
    /**
     * Get all the errors.
     */
    all(): Record<string, any>;
    /**
     * Determine if there is an error for the given field.
     */
    has(field: string): boolean;
    /**
     * Determine if there are any errors for the given fields.
     */
    hasAny(...fields: string[]): boolean;
    /**
     * Determine if there are any errors.
     */
    any(): boolean;
    /**
     * Get the first error message for the given field.
     */
    get(field: string): string | undefined;
    /**
     * Get all the error messages for the given field.
     */
    getAll(field: string): string[];
    /**
     * Get the error message for the given fields.
     */
    only(...fields: string[]): string[];
    /**
     * Get all the errors in a flat array.
     */
    flatten(): string[];
    /**
     * Clear one or all error fields.
     */
    clear(field?: string | undefined): void;
}
