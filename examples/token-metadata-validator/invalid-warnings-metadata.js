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
const { Validator, defaultVersion } = require('../..');

function main() {
  const metadataInstance = {
    creator: 'HANGRY BARBOONS',
    description:
      'HANGRY BARBOONS are 4,444 unique citizens from the United Hashgraph of Planet Earth. Designed and illustrated by President HANGRY.',
    format: 'none',
    name: 'HANGRY BARBOON #2343',
    image: 'ipfs://QmaHVnnp7qAmGADa3tQfWVNxxZDRmTL5r6jKrAo16mSd5y/2343.png',
    type: 'image/png',
    properties: { edition: 2343 },
    attributes: [
      { trait_type: 'Background', value: 'Yellow' },
      { trait_type: 'Fur', value: 'Gold' },
      { trait_type: 'Clothing', value: 'Floral Jacket' },
      { trait_type: 'Mouth', value: 'Tongue' },
      { trait_type: 'Sing', value: 'None' },
    ],
    myAdditionalProperty: 'Additional properties should be included in properties',
  };

  const validator = new Validator();
  const results = validator.validate(metadataInstance, defaultVersion);
  console.log(results);

  /* Output:
        {
            errors: [],
            warnings: [
                {
                    type: 'schema',
                    msg: "is not allowed to have the additional property 'myAdditionalProperty'",
                    path: 'instance'
                }
            ]
        }
    */
}

main();
