import { type z } from 'zod';
import type { ErrorMessageOptions } from 'zod-error';
export declare const noPropertiesErrorOptions: ErrorMessageOptions;
export declare const propertiesErrorOptions: ErrorMessageOptions;
export declare const validationMetadataErrorOptions: ErrorMessageOptions;
export declare const validateObjectWithSchema: <T extends {
    [key: string]: unknown;
}>(Schema: z.ZodSchema<T>, object: z.infer<z.ZodSchema<T | unknown>>, errorMessageOptions?: ErrorMessageOptions) => T;
//# sourceMappingURL=validate-object-with-schema.d.ts.map