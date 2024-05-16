"use strict";

var _buffer = require("buffer");
var _axios = _interopRequireDefault(require("axios"));
var _nftStorageService = require("../../../services/file-storages/nft-storage/nft-storage-service");
var _dictionary = require("../../../utils/constants/dictionary");
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
describe('NftStorageService', () => {
  const serviceUrl = 'https://api.nft.storage/';
  const uploadUrl = 'upload';
  const apiKeysList = ['testKey1', 'testKey2'];
  let mockAxios;
  beforeEach(() => {
    mockAxios = _axios.default;
  });
  it('should return the expected string when uploadFile is called', async () => {
    const mockFile = new _buffer.Blob([new Uint8Array([1, 2, 3])]);
    const mockResponse = {
      data: {
        value: {
          cid: 'testCid'
        }
      }
    };
    mockAxios.create.mockReturnValue(mockAxios);
    mockAxios.post.mockResolvedValue(mockResponse);
    const result = await new _nftStorageService.NftStorageService(serviceUrl, uploadUrl, apiKeysList).uploadFile(mockFile);
    expect(result).toEqual('ipfs://testCid');
  });
  it('should throw an error when no API keys are provided', () => {
    expect(() => new _nftStorageService.NftStorageService(serviceUrl, uploadUrl, [])).toThrow(_dictionary.dictionary.errors.noApiKeys);
  });
});
//# sourceMappingURL=nft-storage-service.test.js.map