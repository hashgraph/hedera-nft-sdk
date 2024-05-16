"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSchemaVersion = exports.Validator = void 0;
var _validators = require("./validators");
var _HIP = _interopRequireDefault(require("./schemas/HIP10@1.0.0"));
var _HIP2 = _interopRequireDefault(require("./schemas/HIP412@2.0.0"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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

const defaultSchemaVersion = exports.defaultSchemaVersion = '2.0.0';
class Validator {
  constructor() {
    let schemas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    this.schemaMap = new Map();
    this.schemaMap.set('1.0.0', _HIP.default);
    this.schemaMap.set('2.0.0', _HIP2.default);
    schemas.forEach(schema => {
      this.schemaMap.set(schema.tag, schema.schemaObject);
    });
  }
  getSchema(version) {
    const validVersion = this.schemaMap.has(version);
    if (validVersion) {
      return this.schemaMap.get(version);
    }
    return this.schemaMap.get(defaultSchemaVersion);
  }
  validate(instance) {
    let schemaVersion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSchemaVersion;
    const schema = this.getSchema(schemaVersion);
    if (!schema) throw new Error('Invalid schema version');
    const schemaProblems = (0, _validators.schemaValidator)(instance, schema);

    // If there are schema problems, return them and stop the validation process
    if (schemaProblems.errors.length > 0) {
      return {
        errors: [...schemaProblems.errors],
        warnings: [...schemaProblems.warnings]
      };
    }
    const errors = [...(0, _validators.attributesValidator)(instance), ...(0, _validators.localizationValidator)(instance), ...(0, _validators.SHA256Validator)(instance)];
    return {
      errors,
      warnings: [...schemaProblems.warnings]
    };
  }
}
exports.Validator = Validator;
//# sourceMappingURL=index.js.map