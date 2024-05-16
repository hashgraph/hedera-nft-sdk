import { Instance, Error } from '../../types/validator';
/**
 * The localization validator applies specific rules for the localization object
 * such as validating two-letter language codes, the default locale, and the localization URI format.
 * If the localization field is not present (optional field), no errors are returned.
 *
 * @see https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md#localization
 *
 * @param {Object} instance - The JSON object to validate against a schema
 * @returns {Array} - Contains no, one, or multiple error objects that describe errors for the validated {instance}
 */
declare const localizationValidator: (instance: Instance) => Error[];
export { localizationValidator };
//# sourceMappingURL=localization.d.ts.map