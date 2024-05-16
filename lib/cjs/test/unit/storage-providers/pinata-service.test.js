"use strict";

var _pinataService = require("../../../services/file-storages/pinata/pinata-service");
var _buffer = require("buffer");
var _axios = _interopRequireDefault(require("axios"));
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
const mockAxios = _axios.default;
describe('PinataService', () => {
  const pinataJwtKey = 'testJwtKey';
  const pinataApiKey = 'testApiKey';
  const pinataSecretApiKey = 'testSecretApiKey';
  beforeEach(() => {
    const mockResponse = {
      data: {
        IpfsHash: 'testHash'
      }
    };
    mockAxios.create.mockReturnValue(mockAxios);
    mockAxios.post.mockResolvedValue(mockResponse);
  });
  it('should return the expected string when uploadFile is called', async () => {
    const pinataService = new _pinataService.PinataService(pinataJwtKey, pinataApiKey, pinataSecretApiKey);
    const mockFile = new _buffer.Blob([new Uint8Array([1, 2, 3])]);
    const result = await pinataService.uploadFile(mockFile);
    expect(result).toEqual('ipfs://testHash');
  });
  it('should return the expected string when only JWTToken is passed', async () => {
    const pinataService = new _pinataService.PinataService(pinataJwtKey, undefined, undefined);
    const mockFile = new _buffer.Blob([new Uint8Array([1, 2, 3])]);
    const result = await pinataService.uploadFile(mockFile);
    expect(result).toEqual('ipfs://testHash');
  });
  it('should return the expected string when only ApiKey and SecretKey is passed', async () => {
    const pinataService = new _pinataService.PinataService(undefined, pinataApiKey, pinataSecretApiKey);
    const mockFile = new _buffer.Blob([new Uint8Array([1, 2, 3])]);
    const result = await pinataService.uploadFile(mockFile);
    expect(result).toEqual('ipfs://testHash');
  });
  it('should throw an error when no JWT or ApiKey keys are provided', () => {
    expect(() => new _pinataService.PinataService(undefined, undefined, 'test')).toThrow(_dictionary.dictionary.errors.pinataError);
  });
  it('should throw an error when no JWT or SecretKey keys are provided', () => {
    expect(() => new _pinataService.PinataService(undefined, 'test', undefined)).toThrow(_dictionary.dictionary.errors.pinataError);
  });
});
//# sourceMappingURL=pinata-service.test.js.map