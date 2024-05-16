"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationMetadataErrorOptions = exports.validateObjectWithSchema = exports.propertiesErrorOptions = exports.noPropertiesErrorOptions = void 0;
var _dictionary = require("../utils/constants/dictionary");
var _filter = _interopRequireDefault(require("lodash/filter"));
var _keys = _interopRequireDefault(require("lodash/keys"));
var _zodError = require("zod-error");
var _validationError = require("../utils/validation-error");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*-
 *
 * Hedera NFT SDK
 *
 * Copyright (C) 2024 Hedera Hashgraph, LLC
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

const noPropertiesErrorOptions = exports.noPropertiesErrorOptions = {
  prefix: '',
  delimiter: {
    error: '\n'
  },
  message: {
    enabled: true,
    transform: _ref => {
      let {
        value
      } = _ref;
      return value;
    }
  },
  path: {
    enabled: false
  },
  transform: _ref2 => {
    let {
      messageComponent
    } = _ref2;
    return messageComponent;
  }
};
const propertiesErrorOptions = exports.propertiesErrorOptions = {
  prefix: '',
  path: {
    type: 'breadcrumbs',
    enabled: true,
    label: 'Invalid',
    transform: _ref3 => {
      let {
        label,
        value
      } = _ref3;
      return `${label} "${value}".`;
    }
  },
  code: {
    enabled: false
  },
  delimiter: {
    component: ' ',
    error: ''
  },
  transform: _ref4 => {
    let {
      errorMessage
    } = _ref4;
    return `${errorMessage}\n`;
  }
};
const validationMetadataErrorOptions = exports.validationMetadataErrorOptions = {
  prefix: '',
  path: {
    type: 'breadcrumbs',
    enabled: true,
    label: 'The required',
    transform: _ref5 => {
      let {
        label,
        value
      } = _ref5;
      return `${label} "${value}" field is missing.`;
    }
  },
  code: {
    enabled: false
  },
  delimiter: {
    component: ' ',
    error: ''
  },
  message: {
    enabled: false
  },
  transform: _ref6 => {
    let {
      errorMessage
    } = _ref6;
    return errorMessage;
  }
};
const validateObjectWithSchema = function (Schema, object) {
  let errorMessageOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noPropertiesErrorOptions;
  const validation = Schema.safeParse(object);
  if (!validation.success) {
    const errorMessages = validation.error.issues.map(issue => (0, _zodError.generateErrorMessage)([issue], errorMessageOptions));
    throw new _validationError.ValidationError(errorMessages);
  }
  const parsedObjectWithSchema = Schema.parse(object);
  const overPropertiesFromObjectWhichAreNotInSchema = (0, _filter.default)((0, _keys.default)(object), key => !(0, _keys.default)(parsedObjectWithSchema).includes(key));
  if (overPropertiesFromObjectWhichAreNotInSchema.length > 0) {
    throw new Error(_dictionary.dictionary.validation.invalidKeysDetected(overPropertiesFromObjectWhichAreNotInSchema));
  }
  return object;
};
exports.validateObjectWithSchema = validateObjectWithSchema;
//# sourceMappingURL=validate-object-with-schema.js.map