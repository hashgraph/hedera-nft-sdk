import { ValidationResult } from '../types/validator';
interface ValidationResults {
    [key: string]: ValidationResult;
}
/**
 * Validate files locally
 *
 * @param {string} relative Relative path to folder containing files
 * @returns {Object<filename<string>, validationResults<Object>>}
 */
declare const localValidation: (_: string) => ValidationResults;
export { localValidation, };
//# sourceMappingURL=browser.d.ts.map