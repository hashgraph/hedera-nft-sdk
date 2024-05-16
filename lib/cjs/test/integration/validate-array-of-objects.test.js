"use strict";

var _tokenMetadataValidator = require("../../token-metadata-validator");
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

const VALID_METADATA_OBJECTS = [{
  name: 'Example NFT 1',
  creator: 'Hedera',
  description: 'This is an example NFT 1',
  image: 'https://nft.com/mycollection/1.jpg',
  type: 'image/jpeg',
  properties: {
    external_url: 'https://nft.com/mycollection/1',
    url: 'https://nft.com/mycollection/1'
  },
  attributes: [{
    trait_type: 'color',
    value: 'rgb(0,255,0)'
  }, {
    trait_type: 'hasPipe',
    value: 'false'
  }, {
    trait_type: 'stamina',
    value: '55'
  }]
}, {
  name: 'Example NFT 2',
  creator: 'Hedera',
  description: 'This is an example NFT 2',
  image: 'https://nft.com/mycollection/2.jpg',
  type: 'image/jpeg',
  properties: {
    external_url: 'https://nft.com/mycollection/2',
    url: 'https://nft.com/mycollection/2'
  },
  attributes: [{
    trait_type: 'color',
    value: 'rgb(0,255,0)'
  }, {
    trait_type: 'hasPipe',
    value: 'false'
  }, {
    trait_type: 'stamina',
    value: '99'
  }]
}];
const MIXED_METADATA_OBJECTS = [{
  name: '',
  creator: 'Hedera',
  description: 'This is an example NFT 1',
  type: 'image/jpeg',
  properties: {
    external_url: 'https://nft.com/mycollection/1',
    url: 'https://nft.com/mycollection/1'
  },
  attributes: [{
    trait_type: 'color',
    value: 'rgb(0,255,0)'
  }, {
    trait_type: 'hasPipe',
    value: 'false'
  }, {
    trait_type: 'stamina',
    value: '55'
  }]
}, {
  name: 'Example NFT 2',
  creator: 'Hedera',
  description: 'This is an example NFT 2',
  image: 'https://nft.com/mycollection/2.jpg',
  type: 'image/jpeg',
  properties: {
    external_url: 'https://nft.com/mycollection/2',
    url: 'https://nft.com/mycollection/2'
  },
  attributes: [{
    trait_type: 'color',
    value: 'rgb(0,255,0)'
  }, {
    trait_type: 'hasPipe',
    value: 'false'
  }, {
    trait_type: 'stamina',
    value: '99'
  }]
}, {}];
describe('validateArrayOfObjects', () => {
  it('validates an array of valid metadata objects successfully', async () => {
    const validationResult = _tokenMetadataValidator.TokenMetadataValidator.validateArrayOfObjects(VALID_METADATA_OBJECTS);
    Object.values(validationResult.results).forEach(result => {
      expect(result.isValid).toBe(true);
      expect(result.errorsCount).toBe(0);
      expect(result.errors.length).toBe(0);
    });
  });
  it('identifies errors in an array with invalid metadata objects', async () => {
    const validationResult = _tokenMetadataValidator.TokenMetadataValidator.validateArrayOfObjects(MIXED_METADATA_OBJECTS);
    expect(validationResult.allObjectsValid).toBe(false);
    expect(validationResult.results[0].isValid).toBe(false);
    expect(validationResult.results[0].errorsCount).toBe(2);
    expect(validationResult.results[0].errors.length).toBe(2);
    expect(validationResult.results[1].isValid).toBe(true);
    expect(validationResult.results[1].errorsCount).toBe(0);
    expect(validationResult.results[1].errors.length).toBe(0);
    expect(validationResult.results[2].isValid).toBe(false);
    expect(validationResult.results[2].errorsCount).toBe(3);
    expect(validationResult.results[2].errors.length).toBe(3);
  });
});
//# sourceMappingURL=validate-array-of-objects.test.js.map