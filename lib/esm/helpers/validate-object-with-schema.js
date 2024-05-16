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
import { dictionary } from '../utils/constants/dictionary';
import filter from 'lodash/filter';
import keys from 'lodash/keys';
import { generateErrorMessage } from 'zod-error';
import { ValidationError } from '../utils/validation-error';
export const noPropertiesErrorOptions = {
  prefix: '',
  delimiter: {
    error: '\n'
  },
  message: {
    enabled: true,
    transform: ({
      value
    }) => value
  },
  path: {
    enabled: false
  },
  transform: ({
    messageComponent
  }) => messageComponent
};
export const propertiesErrorOptions = {
  prefix: '',
  path: {
    type: 'breadcrumbs',
    enabled: true,
    label: 'Invalid',
    transform: ({
      label,
      value
    }) => `${label} "${value}".`
  },
  code: {
    enabled: false
  },
  delimiter: {
    component: ' ',
    error: ''
  },
  transform: ({
    errorMessage
  }) => `${errorMessage}\n`
};
export const validationMetadataErrorOptions = {
  prefix: '',
  path: {
    type: 'breadcrumbs',
    enabled: true,
    label: 'The required',
    transform: ({
      label,
      value
    }) => `${label} "${value}" field is missing.`
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
  transform: ({
    errorMessage
  }) => errorMessage
};
export const validateObjectWithSchema = (Schema, object, errorMessageOptions = noPropertiesErrorOptions) => {
  const validation = Schema.safeParse(object);
  if (!validation.success) {
    const errorMessages = validation.error.issues.map(issue => generateErrorMessage([issue], errorMessageOptions));
    throw new ValidationError(errorMessages);
  }
  const parsedObjectWithSchema = Schema.parse(object);
  const overPropertiesFromObjectWhichAreNotInSchema = filter(keys(object), key => !keys(parsedObjectWithSchema).includes(key));
  if (overPropertiesFromObjectWhichAreNotInSchema.length > 0) {
    throw new Error(dictionary.validation.invalidKeysDetected(overPropertiesFromObjectWhichAreNotInSchema));
  }
  return object;
};
//# sourceMappingURL=validate-object-with-schema.js.map