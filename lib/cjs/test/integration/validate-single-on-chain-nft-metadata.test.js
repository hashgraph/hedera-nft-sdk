"use strict";

var _axios = _interopRequireDefault(require("axios"));
var _tokenMetadataValidator = require("../../token-metadata-validator");
var _consts = require("../__mocks__/consts");
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

const encodedMetadata = btoa(JSON.stringify('https://link-to-example-metadata.com'));
const MOCKED_NFT_RESPONSE = {
  account_id: '0.0.1638',
  created_timestamp: '1708435543.303452003',
  delegating_spender: null,
  deleted: false,
  metadata: encodedMetadata,
  modified_timestamp: '1708435543.303452003',
  serial_number: 1,
  spender: null,
  token_id: '0.0.3573355'
};
const VALID_NFT_METADATA = {
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
    value: 'rgb(255,0,0)'
  }, {
    trait_type: 'hasPipe',
    value: 'true'
  }, {
    trait_type: 'stamina',
    value: '83'
  }]
};
const NFT_METADATA_WITH_MISSING_REQUIRED_FIELDS = {
  creator: 'Hedera',
  description: 'This is an example NFT 2',
  properties: {
    external_url: 'https://nft.com/mycollection/2',
    url: 'https://nft.com/mycollection/2'
  },
  attributes: [{
    trait_type: 'color',
    value: 'rgb(255,0,0)'
  }, {
    trait_type: 'hasPipe',
    value: 'true'
  }, {
    trait_type: 'stamina',
    value: '83'
  }]
};
jest.mock('axios');
const mockedAxios = _axios.default;
describe('validateSingleOnChainNFTMetadata', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });
  it('validates single NFT metadata successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: MOCKED_NFT_RESPONSE
    }).mockResolvedValueOnce({
      data: VALID_NFT_METADATA
    });
    const validationResult = await _tokenMetadataValidator.TokenMetadataValidator.validateSingleOnChainNFTMetadata(_consts.NETWORK, '0.0.3573355', 1, _consts.EXAMPLE_IPFS_GATEWAY);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });
  it('validates single NFT metadata and shows errors about missing fields in metadata object', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: MOCKED_NFT_RESPONSE
    }).mockResolvedValueOnce({
      data: NFT_METADATA_WITH_MISSING_REQUIRED_FIELDS
    });
    const validationResult = await _tokenMetadataValidator.TokenMetadataValidator.validateSingleOnChainNFTMetadata(_consts.NETWORK, '0.0.3573355', 1, _consts.EXAMPLE_IPFS_GATEWAY);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toHaveLength(3);
  });
});
//# sourceMappingURL=validate-single-on-chain-nft-metadata.test.js.map