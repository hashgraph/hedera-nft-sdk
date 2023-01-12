const { schemaValidator, attributesValidator, localizationValidator, SHA256Validator } = require("./validators");
const { getSchema, defaultVersion } = require("./schemas");

/**
 * Validate a metadata object against a schema. This function validates the instance respectively against
 * the schema validator, attributes validator, localization validator, and SHA256 validator. 
 * 
 * If the schema validator (jsonschema) returns errors, it's not possible to run the other validators because properties might be missing.
 * The other validators are executed when the schema validator only returns "additional property" erros which don't affect the execution of other validators.
 * 
 * @param {Object} instance - The JSON object to validate against a schema
 * @param {string} schemaVersion [schemaVersion = defaultVersion = 1.0.0] - The metadata schema version against which we want to validate our {instance}
 * @returns {Array} - Contains no, one, or multiple error objects that describe errors for the validated {instance}
 */
const validator = (instance, schemaVersion = defaultVersion) => {
    let errors = [];
    let warnings = [];

    const schema = getSchema(schemaVersion)

    // When errors against the schema are found, you don't want to continue verifying the NFT
    // Warnings don't matter because they only contain "additional property" warnings
    const schemaProblems = schemaValidator(instance, schema);
    warnings.push(...schemaProblems.warnings);
    if (schemaProblems.errors.length > 0) {
        errors.push(...schemaProblems.errors);

        return {
            errors,
            warnings
        }
    }

    const attributeErrors = attributesValidator(instance);
    errors.push(...attributeErrors);

    const localizationErrors = localizationValidator(instance);
    errors.push(...localizationErrors);

    const SHA256Errors = SHA256Validator(instance);
    errors.push(...SHA256Errors);

    return {
        errors,
        warnings
    };
}

module.exports = {
    validator,
    defaultVersion
};
