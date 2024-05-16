"use strict";

var fs = _interopRequireWildcard(require("fs"));
var _mintUniqueMetadataFunction = require("../../../nftSDKFunctions/mint-unique-metadata-function");
var _consts = require("../../__mocks__/consts");
var _mintToken = require("../../../nftSDKFunctions/mint-token");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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

jest.mock('fs');
jest.mock('csv-parser');
jest.mock('../../../nftSDKFunctions/mint-token');
describe('mintUniqueMetadataFunction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return success metadata when given valid input from file path', async () => {
    const mockClient = {};
    const supplyKey = _consts.myPrivateKey;
    const mockReadStream = {
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn().mockImplementation(function (event, handler) {
        if (event === 'data') {
          handler({
            '0': 'url1,url2'
          });
        }
        if (event === 'end') {
          handler();
        }
        return mockReadStream;
      })
    };
    fs.createReadStream.mockReturnValue(mockReadStream);
    _mintToken.mintToken.mockResolvedValueOnce({
      serials: Array.from({
        length: 2
      }, (_, i) => ({
        toNumber: () => i + 1
      }))
    });
    const input = {
      client: mockClient,
      tokenId: '0.0.123',
      batchSize: 5,
      pathToMetadataURIsFile: 'mockPath',
      supplyKey: supplyKey
    };
    const result = await (0, _mintUniqueMetadataFunction.mintUniqueMetadataFunction)(input);
    expect(result).toEqual([{
      content: 'url1',
      serialNumber: 1
    }, {
      content: 'url2',
      serialNumber: 2
    }]);
    expect(fs.createReadStream).toHaveBeenCalledWith('mockPath');
    expect(_mintToken.mintToken).toHaveBeenCalledTimes(1);
    expect(_mintToken.mintToken).toHaveBeenNthCalledWith(1, ['url1', 'url2'], '0.0.123', supplyKey, {});
  });
  it('should return success metadata when given valid input from array', async () => {
    const mockClient = {};
    const supplyKey = _consts.myPrivateKey;
    _mintToken.mintToken.mockResolvedValueOnce({
      serials: Array.from({
        length: 2
      }, (_, i) => ({
        toNumber: () => i + 1
      }))
    });
    const input = {
      client: mockClient,
      tokenId: '0.0.123',
      batchSize: 5,
      supplyKey: supplyKey,
      metadataArray: ['url5', 'url3']
    };
    const result = await (0, _mintUniqueMetadataFunction.mintUniqueMetadataFunction)(input);
    expect(result).toEqual([{
      content: 'url5',
      serialNumber: 1
    }, {
      content: 'url3',
      serialNumber: 2
    }]);
    expect(_mintToken.mintToken).toHaveBeenCalledTimes(1);
    expect(_mintToken.mintToken).toHaveBeenNthCalledWith(1, ['url5', 'url3'], '0.0.123', supplyKey, {});
  });
});
//# sourceMappingURL=mint-unique-metadata-function.test.js.map