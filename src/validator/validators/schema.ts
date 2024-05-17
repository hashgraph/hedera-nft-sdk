/*-
 *
 * Hedera NFT SDK
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
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Instance, ValidationResult } from '../../types/validator';

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const additionalPropertyMsg = 'must NOT have additional properties';

/**
 * Distil an errors array from AJV into errors and warnings.
 * We want to separate "additional property" errors into warnings because they don't influence the further validation of the JSON object.
 *
 * @param {Array} problems - Errors array from AJV
 */
const distilProblems = (problems: any[]) => {
  const { warnings, errors } = problems.reduce<{ warnings: any[]; errors: any[] }>(
    (acc, problem) => {
      if (problem.message.includes(additionalPropertyMsg)) {
        acc.warnings.push(problem);
      } else {
        acc.errors.push(problem);
      }
      return acc;
    },
    { warnings: [], errors: [] }
  );

  return {
    warnings,
    errors,
  };
};

/**
 * The schema validator validates the {instance} against a specific version of the HIP412 metadata standard using jsonschema validation using AJV package
 *
 * @see https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md#default-schema-collectibe-hedera-nfts-format-hip412100
 *
 * @param {Object} instance - The JSON object to validate against a schema
 * @param {Object} schema - The schema to validate the {instance} against
 * @returns {ValidationResult} - Contains no, one, or multiple error objects that describe errors for the validated {instance}
 */
const schemaValidator = (instance: Instance, schema: Object): ValidationResult => {
  const validate = ajv.compile(schema);
  validate(instance);

  const distilledProblems = distilProblems(validate.errors || []);

  const errors = distilledProblems.errors.map((error) => ({
    type: 'schema',
    msg: error.message.replace(/\"/g, "'"),
    path: error.instancePath,
  }));

  const warnings = distilledProblems.warnings.map((warning) => ({
    type: 'schema',
    msg: warning.message.replace(/\"/g, "'"),
    path: warning.instancePath,
  }));

  return {
    errors,
    warnings,
  };
};

export { schemaValidator };
