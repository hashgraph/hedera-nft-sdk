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
const { Validator } = require('../..');

function main() {
  // Define your JSON schema
  const customSchema = {
    title: 'Token Metadata',
    type: 'object',
    additionalProperties: false,
    properties: {
      version: {
        type: 'string',
        description: 'Semantic version for the metadata JSON format.',
      },
      name: {
        type: 'string',
        description: 'Identifies the asset to which this token represents.',
      },
    },
    required: ['version', 'name'],
  };

  // Create Validator instance with custom schema
  const validator = new Validator([{ schemaObject: customSchema, tag: 'custom-v1' }]);

  // Define metadata
  const metadataInstance = {
    version: 'v3.0.0',
    name: 'HANGRY BARBOON #2343',
    image: 'ipfs://QmaHVnnp7qAmGADa3tQfWVNxxZDRmTL5r6jKrAo16mSd5y/2343.png',
  };

  // Verify metadata against custom schema
  const results = validator.validate(metadataInstance, 'custom-v1');
  console.log(results);

  /* Output:
        {
            errors: [],
            warnings: [
                {
                    type: 'schema',
                    msg: "is not allowed to have the additional property 'image'",
                    path: 'instance'
                }
            ]
        }
    */
}

main();
