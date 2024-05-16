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
import { dictionary } from '../../../utils/constants/dictionary';
import { TokenMetadataValidator } from '../../../token-metadata-validator';
const METADATA_OBJECT_WITH_ONLY_REQUIRED_FIELDS = {
  name: 'Example NFT 1',
  image: 'https://nft.com/mycollection/1.jpg',
  type: 'image/jpeg'
};
const METADATA_OBJECT_WITH_ONE_REQUIRED_FIELD_MISSING = {
  name: 'Example NFT 1',
  type: 'image/jpeg'
};
const METADATA_OBJECT_WITH_TWO_REQUIRED_FIELDS_MISSING = {
  name: 'Example NFT 1'
};
const METADATA_OBECT_WITH_ALL_FIELDS = {
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
    value: '65'
  }]
};
const METADATA_OBJECT_WITH_INVALID_IMAGE_TYPE = {
  name: 'Example NFT 1',
  image: 'https://nft.com/mycollection/1.jpg',
  type: 'text/plain'
};
const METADATA_OBJECT_WITH_INVALID_ATTRIBUTES_STRUCTURE = {
  name: 'Example NFT 1',
  creator: 'Hedera',
  description: 'This is an example NFT 1',
  image: 'https://nft.com/mycollection/1.jpg',
  type: 'image/jpeg',
  properties: {
    external_url: 'https://nft.com/mycollection/1',
    url: 'https://nft.com/mycollection/1'
  },
  attributes: 'This is not a valid attributes structure'
};
const validate = metadataObject => {
  return TokenMetadataValidator.validateSingleMetadataObject(metadataObject);
};
describe('TokenMetadataValidator.validateSingleObject', () => {
  it('should not return any errors for an object with all fields filled properly', () => {
    const validationResult = validate(METADATA_OBECT_WITH_ALL_FIELDS);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });
  it('should not return any errors for an object with only required fields filled', () => {
    const validationResult = validate(METADATA_OBJECT_WITH_ONLY_REQUIRED_FIELDS);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });
  it('should return one error for an object missing the image field', () => {
    const validationResult = validate(METADATA_OBJECT_WITH_ONE_REQUIRED_FIELD_MISSING);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toHaveLength(1);
  });
  it('should return two errors for an object missing the image and type field', () => {
    const validationResult = validate(METADATA_OBJECT_WITH_TWO_REQUIRED_FIELDS_MISSING);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toHaveLength(2);
  });
  it('should return an error for an object with an invalid image MIME type', () => {
    const validationResult = validate(METADATA_OBJECT_WITH_INVALID_IMAGE_TYPE);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual([dictionary.validation.requiredTypeFieldIsMissing]);
  });
  it('should return an error for an object with an invalid attributes structure', () => {
    const validationResult = validate(METADATA_OBJECT_WITH_INVALID_ATTRIBUTES_STRUCTURE);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual([dictionary.validation.requiredAttributeFieldMissing]);
  });
});
//# sourceMappingURL=validate-single-metadata-object.test.js.map