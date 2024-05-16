import type { Instance } from '../../types/validator';
/**
 * The SHA256 validator applies specific rules for SHA256 hashes,
 * mostly present in "checksum" fields to verify the integrity of images or other file types
 *
 * @see https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md#checksum
 *
 * @param {Object} instance - The JSON object to validate against a schema
 * @returns {Array} - Contains no, one, or multiple error objects that describe errors for the validated {instance}
 */
declare const SHA256Validator: (instance: Instance) => {
    type: string;
    msg: string;
}[];
export { SHA256Validator };
//# sourceMappingURL=SHA256.d.ts.map