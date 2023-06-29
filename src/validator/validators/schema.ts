/*-
 *
 * Hedera NFT Utilities
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { Validator, ValidationError } from 'jsonschema';
const validator = new Validator();

import { Instance, ValidationResult } from '../../types/validator.module';

const additionalPropertyMsg = 'is not allowed to have the additional property';

/**
 * Distil an errors array from JSON schema into errors and warnings. 
 * We want to separate "additional property" errors into warnings because they don't influence the further validatin of the JSON object.
 * 
 * @param {ValidationError[]} problems - Errors array from jsonschema
 */
const distilProblems = (problems: ValidationError[]) => {
  const {warnings, errors} = problems.reduce<{warnings: ValidationError[]; errors: ValidationError[]}>((acc, problem) => {
    if (problem.message.includes(additionalPropertyMsg)) {
      acc.warnings.push(problem);
    } else {
      acc.errors.push(problem);
    }
    return acc;
  }, {warnings: [], errors: []});
  
  return {
    warnings,
    errors,
  };
};

/**
 * The schema validator validates the {instance} against a specific version of the HIP412 metadata standard using jsonschema
 * 
 * @see https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md#default-schema-collectibe-hedera-nfts-format-hip412100
 * 
 * @param {Object} instance - The JSON object to validate against a schema
 * @param {Object} schema - The schema to validate the {instance} against
 * @returns {ValidationResult} - Contains no, one, or multiple error objects that describe errors for the validated {instance}
 */
const schemaValidator = (instance: Instance, schema: Object): ValidationResult => {
  const result = validator.validate(instance, schema);
  const distilledProblems = distilProblems(result.errors);

  const errors = distilledProblems.errors.map((error) => ({
    type: 'schema',
    msg: error.message.replace(/\"/g, "'"),
    path: error.property,
  }));

  const warnings = distilledProblems.warnings.map((warning) => ({
    type: 'schema',
    msg: warning.message.replace(/\"/g, "'"),
    path: warning.property,
  }));

  return {
    errors,
    warnings,
  };
};

export {
  schemaValidator,
};
