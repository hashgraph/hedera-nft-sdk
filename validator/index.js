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
const {
  schemaValidator,
  attributesValidator,
  localizationValidator,
  SHA256Validator,
} = require("./validators");

const token_metadata_1_0_0 = require("./schemas/HIP10@1.0.0.json");
const token_metadata_2_0_0 = require("./schemas/HIP412@2.0.0.json");
const defaultSchemaVersion = "2.0.0";

class Validator {
  /**
   * @param {Array<Object>} schemas
   * @param {string} schemas.tag - The tag of the schema
   * @param {Object} schemas.schemaObject - The schema object
   */
  constructor(schemas = []) {
    this.schemaMap = new Map();
    this.schemaMap.set("1.0.0", token_metadata_1_0_0);
    this.schemaMap.set("2.0.0", token_metadata_2_0_0);

    schemas.forEach((schema) => {
      this.schemaMap.set(schema.tag, schema.schemaObject);
    });
  }

  /**
   * Retrieves correct schema for the requested HIP412 metadata schema version.
   * If the version doesn't exist, it will return the default schema version "2.0.0".
   *
   * @param {string} version - The schema version to load.
   * @return {Object} - Returns a json schema JSON object.
   */
  getSchema(version) {
    const validVersion = this.schemaMap.has(version);
    if (validVersion) {
      return this.schemaMap.get(version);
    }

    return this.schemaMap.get(defaultSchemaVersion);
  }

  /**
   * Validate a metadata object against a schema. This function validates the instance respectively against
   * the schema validator, attributes validator, localization validator, and SHA256 validator.
   *
   * If the schema validator (jsonschema) returns errors, it's not possible to run the other validators because properties might be missing.
   * The other validators are executed when the schema validator only returns "additional property" erros which don't affect the execution of other validators.
   *
   * @param {Object} instance - The JSON object to validate against a schema
   * @param {string} schemaVersion [schemaVersion = defaultSchemaVersion = 2.0.0] - The metadata schema version against which we want to validate our {instance}
   * @returns {Array} - Contains no, one, or multiple error objects that describe errors for the validated {instance}
   */
  validate(instance, schemaVersion = defaultSchemaVersion) {
    let errors = [];
    let warnings = [];

    const schema = this.getSchema(schemaVersion);

    // When errors against the schema are found, you don't want to continue verifying the NFT
    // Warnings don't matter because they only contain "additional property" warnings
    const schemaProblems = schemaValidator(instance, schema);
    warnings.push(...schemaProblems.warnings);
    if (schemaProblems.errors.length > 0) {
      errors.push(...schemaProblems.errors);

      return {
        errors,
        warnings,
      };
    }

    const attributeErrors = attributesValidator(instance);
    errors.push(...attributeErrors);

    const localizationErrors = localizationValidator(instance);
    errors.push(...localizationErrors);

    const SHA256Errors = SHA256Validator(instance);
    errors.push(...SHA256Errors);

    return {
      errors,
      warnings,
    };
  }
}

module.exports = {
    Validator,
    defaultSchemaVersion
};
