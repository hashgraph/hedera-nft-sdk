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
import { ValidationResult } from '../types/validator';
import { dictionary } from '../utils/constants/dictionary';

interface ValidationResults {
  [key: string]: ValidationResult;
}
/**
 * Function below is not browser supported
 * @browserUnsupported
 */
/**
 * Validate files locally
 *
 * @param {string} relative Relative path to folder containing files
 * @returns {Object<filename<string>, validationResults<Object>>}
 */
const localValidation = (_: string): ValidationResults => {
  throw new Error(dictionary.errors.nodeFeature)
};

export {
  localValidation,
};
