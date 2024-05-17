/*
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
import { schemaValidator, attributesValidator, localizationValidator, SHA256Validator } from './validators';

import token_metadata_1_0_0 from './schemas/HIP10@1.0.0';
import token_metadata_2_0_0 from './schemas/HIP412@2.0.0';
const defaultSchemaVersion = '2.0.0';

import { Schema, Instance } from '../types/validator';

class Validator {
  private schemaMap: Map<string, Object>;

  constructor(schemas: Schema[] = []) {
    this.schemaMap = new Map();
    this.schemaMap.set('1.0.0', token_metadata_1_0_0);
    this.schemaMap.set('2.0.0', token_metadata_2_0_0);

    schemas.forEach((schema) => {
      this.schemaMap.set(schema.tag, schema.schemaObject);
    });
  }

  getSchema(version: string) {
    const validVersion = this.schemaMap.has(version);
    if (validVersion) {
      return this.schemaMap.get(version);
    }

    return this.schemaMap.get(defaultSchemaVersion);
  }

  validate(instance: Instance, schemaVersion: string = defaultSchemaVersion) {
    const schema = this.getSchema(schemaVersion);
    if (!schema) throw new Error('Invalid schema version');

    const schemaProblems = schemaValidator(instance, schema);

    // If there are schema problems, return them and stop the validation process
    if (schemaProblems.errors.length > 0) {
      return {
        errors: [...schemaProblems.errors],
        warnings: [...schemaProblems.warnings],
      };
    }

    const errors = [...attributesValidator(instance), ...localizationValidator(instance), ...SHA256Validator(instance)];

    return {
      errors,
      warnings: [...schemaProblems.warnings],
    };
  }
}

export { Validator, defaultSchemaVersion };
