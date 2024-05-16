declare const defaultSchemaVersion = "2.0.0";
import { Schema, Instance } from '../types/validator';
declare class Validator {
    private schemaMap;
    constructor(schemas?: Schema[]);
    getSchema(version: string): Object | undefined;
    validate(instance: Instance, schemaVersion?: string): {
        errors: import("../types/validator").Error[];
        warnings: import("../types/validator").Problem[];
    };
}
export { Validator, defaultSchemaVersion };
//# sourceMappingURL=index.d.ts.map