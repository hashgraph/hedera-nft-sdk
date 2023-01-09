const Validator = require("jsonschema").Validator;
const validator = new Validator();

const additionalPropertyMsg = "is not allowed to have the additional property";

/**
 * Distil an errors array from JSON schema into errors and warnings. 
 * We want to separate "additional property" errors into warnings because they don't influence the further validatin of the JSON object.
 * 
 * @param {Array} problems - Errors array from jsonschema
 */
const distilProblems = (problems) => {
    const warnings = problems.map(problem => {
        if (problem.message.includes(additionalPropertyMsg)) return problem;
        return null;
    })
    const filteredWarnings = warnings.filter(warning => !!warning)

    const errors = problems.map(problem => {
        if (!problem.message.includes(additionalPropertyMsg)) return problem;
        return null;
    })
    const filteredErrors = errors.filter(error => !!error)

    return {
        warnings: filteredWarnings,
        errors: filteredErrors
    }
}

/**
 * The schema validator validates the {instance} against a specific version of the HIP412 metadata standard using jsonschema
 * 
 * @see https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md#default-schema-collectibe-hedera-nfts-format-hip412100
 * 
 * @param {Object} instance - The JSON object to validate against a schema
 * @param {Object} schema - The schema to validate the {instance} against
 * @returns {Array} - Contains no, one, or multiple error objects that describe errors for the validated {instance}
 */
const schemaValidator = (instance, schema) => {
  const errors = [];
  const warnings = [];
  let result = validator.validate(instance, schema);

  const distilledProblems = distilProblems(result.errors);

  distilledProblems.errors.forEach((error) => {
    errors.push({
      type: "schema",
      msg: error.message.replace(/\"/g, "'"),
      path: error.property
    });
  });

  distilledProblems.warnings.forEach((warning) => {
    warnings.push({
      type: "schema",
      msg: warning.message.replace(/\"/g, "'"),
      path: warning.property
    });
  });

  return {
    errors,
    warnings
  };
};

module.exports = {
  schemaValidator,
};
