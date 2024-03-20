/*-
 *
 * Hedera NFT Utilities
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
import { Hip412MetadataBuilder } from '../../hip412-metadata-builder';

const MOCKED_NAME = 'Test NFT';
const MOCKED_IMAGE = 'https://example.com/nft.png';
const MOCKED_TYPE = 'image/png';
const MOCKED_ATTRIBUTES_ALL_PARAMS = { trait_type: 'color', value: 'red', display_type: 'percentage', max_value: 100 };
const MOCKED_ATTRIBUTES_REQUIRED_PARAMS = { trait_type: 'character', value: 'angry' };
const MOCKED_CREATOR = 'example_creator';
const MOCKED_CREATOR_DID = 'example_creator_did';
const MOCKED_DESCRIPTION = 'Example description lorem ipsum dolor sit amet';
const MOCKED_CHECKSUM = '9defbb6402d4bf39f2ea580099c73194647b24a659b6f6b778e3dd71755b8862';
const MOCKED_NESTED_METADATA = {
  name: 'Example NFT 4',
  creator: 'Hedera',
  description: 'This is an example NFT 4',
  image: 'https://nft.com/mycollection/4.jpg',
  type: 'image/jpeg',
  properties: {
    external_url: 'https://nft.com/mycollection/4',
    url: 'https://nft.com/mycollection/4',
  },
  attributes: [
    { trait_type: 'color', value: 'rgb(0,255,0)', display_type: 'boolean' },
    { trait_type: 'hasPipe', value: 'false' },
    { trait_type: 'stamina', value: '55' },
  ],
};
const MOCKED_FILE_ALL_PARAMS = {
  uri: 'https://example-11.com/high-res.png',
  type: 'image/png',
  is_default_file: true,
  metadata: MOCKED_NESTED_METADATA,
  metadata_uri: 'example_metadata_uri',
};
const MOCKED_FILE_REQUIRED_PARAMS = {
  uri: 'https://example-22.com/high-res.png',
  type: 'image/gif',
};
const MOCKED_PROPERTY_1 = { key: 'example_key_1', value: 'example_value_1' };
const MOCKED_PROPERTY_2 = { key: 'example_key_2', value: 'example_value_2' };
const MOCKED_PROPERTY_3 = { key: 'example_key_3', value: 'example_value_3' };
const MOCKED_LOCALIZATION = {
  uri: 'example_uri',
  default: 'en',
  locales: ['en', 'pl'],
};

describe('Hip412MetadataBuilder', () => {
  it('should create metadata with only required fields: name, image, and type', () => {
    const builder = new Hip412MetadataBuilder().setName(MOCKED_NAME).setImage(MOCKED_IMAGE).setType(MOCKED_TYPE);
    const result = builder.build();

    expect(result.metadata.name).toEqual(MOCKED_NAME);
    expect(result.metadata.image).toEqual(MOCKED_IMAGE);
    expect(result.metadata.type).toEqual(MOCKED_TYPE);
    expect(result.validationResponse.isValid).toBe(true);
    expect(result.validationResponse.errors.length).toEqual(0);
  });

  it('should return one validation error when there is no name field provided for metadata object', () => {
    const builder = new Hip412MetadataBuilder().setImage(MOCKED_IMAGE).setType(MOCKED_TYPE);
    const result = builder.build();

    expect(result.metadata.name).toEqual('');
    expect(result.metadata.image).toEqual(MOCKED_IMAGE);
    expect(result.metadata.type).toEqual(MOCKED_TYPE);
    expect(result.validationResponse.isValid).toBe(false);
    expect(result.validationResponse.errors.length).toEqual(1);
  });

  it('should return three validation errors when none of the required fields are provided', () => {
    const builder = new Hip412MetadataBuilder();
    const result = builder.build();

    expect(result.metadata.name).toEqual('');
    expect(result.metadata.image).toEqual('');
    expect(result.metadata.type).toEqual('');
    expect(result.validationResponse.isValid).toBe(false);
    expect(result.validationResponse.errors.length).toEqual(3);
  });

  it('should return a full metadata object with all fields filled', () => {
    const builder = new Hip412MetadataBuilder()
      .setName(MOCKED_NAME)
      .setImage(MOCKED_IMAGE)
      .setType(MOCKED_TYPE)
      .addAttribute(MOCKED_ATTRIBUTES_ALL_PARAMS)
      .addAttribute(MOCKED_ATTRIBUTES_REQUIRED_PARAMS)
      .setCreator(MOCKED_CREATOR)
      .setCreatorDID(MOCKED_CREATOR_DID)
      .setDescription(MOCKED_DESCRIPTION)
      .setChecksum(MOCKED_CHECKSUM)
      .addFile(MOCKED_FILE_ALL_PARAMS)
      .addFile(MOCKED_FILE_REQUIRED_PARAMS)
      .addProperty(MOCKED_PROPERTY_1)
      .addProperty(MOCKED_PROPERTY_2)
      .addProperty(MOCKED_PROPERTY_3)
      .setLocalization(MOCKED_LOCALIZATION);

    const result = builder.build();

    expect(result.metadata.name).toEqual(MOCKED_NAME);
    expect(result.metadata.image).toEqual(MOCKED_IMAGE);
    expect(result.metadata.type).toEqual(MOCKED_TYPE);
    expect(result.metadata.attributes).toBeDefined();
    expect(result.metadata.attributes?.length).toEqual(2);
    expect(result.metadata.attributes?.[0]).toEqual(MOCKED_ATTRIBUTES_ALL_PARAMS);
    expect(result.metadata.attributes?.[1]).toEqual(MOCKED_ATTRIBUTES_REQUIRED_PARAMS);
    expect(result.metadata.creator).toEqual(MOCKED_CREATOR);
    expect(result.metadata.creatorDID).toEqual(MOCKED_CREATOR_DID);
    expect(result.metadata.description).toEqual(MOCKED_DESCRIPTION);
    expect(result.metadata.checksum).toEqual(MOCKED_CHECKSUM);
    expect(result.metadata.files).toBeDefined();
    expect(result.metadata.files?.length).toEqual(2);
    expect(result.metadata.files?.[0]).toEqual(MOCKED_FILE_ALL_PARAMS);
    expect(result.metadata.files?.[1]).toEqual(MOCKED_FILE_REQUIRED_PARAMS);
    expect(result.metadata.properties).toBeDefined();
    expect(result.metadata.properties?.[MOCKED_PROPERTY_1.key]).toEqual(MOCKED_PROPERTY_1.value);
    expect(result.metadata.properties?.[MOCKED_PROPERTY_2.key]).toEqual(MOCKED_PROPERTY_2.value);
    expect(result.metadata.properties?.[MOCKED_PROPERTY_3.key]).toEqual(MOCKED_PROPERTY_3.value);
    expect(result.metadata.localization).toEqual(MOCKED_LOCALIZATION);
    expect(result.validationResponse.isValid).toBe(true);
    expect(result.validationResponse.errors.length).toEqual(0);
  });
});
