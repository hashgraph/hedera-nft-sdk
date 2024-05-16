"use strict";

var _sdk = require("@hashgraph/sdk");
var _axios = _interopRequireDefault(require("axios"));
var _increaseNftSupply = require("../../../nftSDKFunctions/increase-nft-supply");
var _validateProps = require("../../../utils/validate-props");
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

jest.mock('axios');
jest.mock('../../../nftSDKFunctions/mint-shared-metadata-function', () => ({
  mintSharedMetadataFunction: jest.fn()
}));
jest.mock('../../../utils/validate-props', () => ({
  validatePropsForIncreaseNFTSupply: jest.fn()
}));
const mockedAxios = _axios.default;
const metadata = 'testMetadata';
const mockResponse = {
  //encoding 'testMetadata' as base64 encoded string
  metadata: btoa(metadata)
};
beforeAll(() => {
  mockedAxios.get.mockResolvedValue({
    data: mockResponse
  });
});
beforeEach(() => {
  jest.clearAllMocks();
});
describe('increaseNFTSupply', () => {
  const mockNftId = {
    tokenId: _sdk.TokenId.fromString('0.0.453'),
    serial: 1,
    _toProtobuf: jest.fn(),
    toBytes: jest.fn()
  };
  const generatedSupplyKey = _sdk.PrivateKey.generate();
  const mockIncreaseNFTSupplyType = {
    client: {},
    network: 'testnet',
    nftId: mockNftId,
    amount: 10,
    batchSize: 5,
    supplyKey: generatedSupplyKey,
    mirrorNodeUrl: 'mirrorNodeUrl'
  };
  it('should validate props before increasing NFT supply', async () => {
    await (0, _increaseNftSupply.increaseNFTSupply)(mockIncreaseNFTSupplyType);
    expect(_validateProps.validatePropsForIncreaseNFTSupply).toHaveBeenCalledWith({
      amount: 10,
      batchSize: 5
    });
  });
  it('should increase supply when called with valid props', async () => {
    await (0, _increaseNftSupply.increaseNFTSupply)(mockIncreaseNFTSupplyType);
    expect(mockedAxios.get).toHaveBeenCalledWith('mirrorNodeUrl/tokens/0.0.453/nfts/1');
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(require('../../../nftSDKFunctions/mint-shared-metadata-function').mintSharedMetadataFunction).toHaveBeenCalledTimes(1);
  });
  it('should call mintSharedMetadataFunction with the correct parameters', async () => {
    await (0, _increaseNftSupply.increaseNFTSupply)(mockIncreaseNFTSupplyType);
    expect(require('../../../nftSDKFunctions/mint-shared-metadata-function').mintSharedMetadataFunction).toHaveBeenCalledWith({
      client: mockIncreaseNFTSupplyType.client,
      tokenId: mockIncreaseNFTSupplyType.nftId.tokenId.toString(),
      amount: mockIncreaseNFTSupplyType.amount,
      batchSize: mockIncreaseNFTSupplyType.batchSize,
      metaData: metadata,
      supplyKey: mockIncreaseNFTSupplyType.supplyKey
    });
  });
  it('should call passed mirrorNodeUrl when provided', async () => {
    await (0, _increaseNftSupply.increaseNFTSupply)(mockIncreaseNFTSupplyType);
    expect(mockedAxios.get).toHaveBeenCalledWith('mirrorNodeUrl/tokens/0.0.453/nfts/1');
  });
  it('should get correct mirror node url for mainnet', async () => {
    const mockIncreaseNFTSupplyTypeMainnet = {
      ...mockIncreaseNFTSupplyType,
      network: 'mainnet',
      mirrorNodeUrl: undefined
    };
    await (0, _increaseNftSupply.increaseNFTSupply)(mockIncreaseNFTSupplyTypeMainnet);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/0.0.453/nfts/1');
  });
  it('should get correct mirror node url for testnet', async () => {
    const mockIncreaseNFTSupplyTypeTestnet = {
      ...mockIncreaseNFTSupplyType,
      network: 'testnet',
      mirrorNodeUrl: undefined
    };
    await (0, _increaseNftSupply.increaseNFTSupply)(mockIncreaseNFTSupplyTypeTestnet);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://testnet.mirrornode.hedera.com/api/v1/tokens/0.0.453/nfts/1');
  });
});
//# sourceMappingURL=increase-nft-supply.test.js.map