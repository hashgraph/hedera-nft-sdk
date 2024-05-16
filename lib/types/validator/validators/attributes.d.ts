import { Instance, Error } from '../../types/validator';
/**
 * The attributes validator applies specific rules for attribute objects
 * such as validating the values for different display types.
 * If the "attributes" property is not present (optional field), no errors are returned.
 *
 * @see https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md#attributesdisplay_type
 *
 * @param {Object} instance - The JSON object to validate against a schema
 * @returns {Array} - Contains no, one, or multiple error objects that describe errors for the validated {instance}
 */
declare const attributesValidator: (instance: Instance) => Error[];
export { attributesValidator };
//# sourceMappingURL=attributes.d.ts.map