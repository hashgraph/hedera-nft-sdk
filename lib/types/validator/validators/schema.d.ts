import { Instance, ValidationResult } from '../../types/validator';
/**
 * The schema validator validates the {instance} against a specific version of the HIP412 metadata standard using jsonschema
 *
 * @see https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md#default-schema-collectibe-hedera-nfts-format-hip412100
 *
 * @param {Object} instance - The JSON object to validate against a schema
 * @param {Object} schema - The schema to validate the {instance} against
 * @returns {ValidationResult} - Contains no, one, or multiple error objects that describe errors for the validated {instance}
 */
declare const schemaValidator: (instance: Instance, schema: Object) => ValidationResult;
export { schemaValidator };
//# sourceMappingURL=schema.d.ts.map