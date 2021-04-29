/**
 * Deep copy the given object.
 */
export declare function deepCopy<T>(obj: T): T;
/**
 * If the given value is not an array, wrap it in one.
 */
export declare function arrayWrap<T>(value: T): T[];
/**
 * Determine if the given data has files.
 */
export declare function hasFiles(data: File | Blob | FileList | Record<string, any>): boolean;
