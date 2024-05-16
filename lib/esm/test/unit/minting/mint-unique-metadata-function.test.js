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
import * as fs from 'fs';
import { mintUniqueMetadataFunction } from '../../../nftSDKFunctions/mint-unique-metadata-function';
import { myPrivateKey } from '../../__mocks__/consts';
import { mintToken } from '../../../nftSDKFunctions/mint-token';
jest.mock('fs');
jest.mock('csv-parser');
jest.mock('../../../nftSDKFunctions/mint-token');
describe('mintUniqueMetadataFunction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return success metadata when given valid input from file path', async () => {
    const mockClient = {};
    const supplyKey = myPrivateKey;
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
    mintToken.mockResolvedValueOnce({
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
    const result = await mintUniqueMetadataFunction(input);
    expect(result).toEqual([{
      content: 'url1',
      serialNumber: 1
    }, {
      content: 'url2',
      serialNumber: 2
    }]);
    expect(fs.createReadStream).toHaveBeenCalledWith('mockPath');
    expect(mintToken).toHaveBeenCalledTimes(1);
    expect(mintToken).toHaveBeenNthCalledWith(1, ['url1', 'url2'], '0.0.123', supplyKey, {});
  });
  it('should return success metadata when given valid input from array', async () => {
    const mockClient = {};
    const supplyKey = myPrivateKey;
    mintToken.mockResolvedValueOnce({
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
    const result = await mintUniqueMetadataFunction(input);
    expect(result).toEqual([{
      content: 'url5',
      serialNumber: 1
    }, {
      content: 'url3',
      serialNumber: 2
    }]);
    expect(mintToken).toHaveBeenCalledTimes(1);
    expect(mintToken).toHaveBeenNthCalledWith(1, ['url5', 'url3'], '0.0.123', supplyKey, {});
  });
});
//# sourceMappingURL=mint-unique-metadata-function.test.js.map