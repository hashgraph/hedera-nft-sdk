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
import { Instance, ValidationResult } from '../../types/validator';

/**
 * Function below is not browser supported
 * @browserUnsupported
 */
/**
 * The schema validator validates the {instance} against a specific version of the HIP412 metadata standard using jsonschema
 *
 * @see https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md#default-schema-collectibe-hedera-nfts-format-hip412100
 *
 * @param {Object} instance - The JSON object to validate against a schema
 * @param {Object} schema - The schema to validate the {instance} against
 * @returns {ValidationResult} - Contains no, one, or multiple error objects that describe errors for the validated {instance}
 */
const schemaValidator = (_: Instance, __: Object): ValidationResult => {
  throw new Error('Not supported in browser.');
};

export { schemaValidator };
