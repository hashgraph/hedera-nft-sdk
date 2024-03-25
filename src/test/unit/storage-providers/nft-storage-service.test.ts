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
import { Blob } from 'buffer';
import axios from 'axios';
import { NftStorageService } from '../../../services/file-storages/nft-storage/nft-storage-service';
import { dictionary } from '../../../utils/constants/dictionary';

jest.mock('axios');

describe('NftStorageService', () => {
  const serviceUrl = 'https://api.nft.storage/';
  const uploadUrl = 'upload';
  const apiKeysList = ['testKey1', 'testKey2'];

  let mockAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should return the expected string when uploadFile is called', async () => {
    const mockFile = new Blob([new Uint8Array([1, 2, 3])]);
    const mockResponse = {
      data: {
        value: { cid: 'testCid' },
      },
    };
    mockAxios.create.mockReturnValue(mockAxios);
    mockAxios.post.mockResolvedValue(mockResponse);

    const result = await new NftStorageService(serviceUrl, uploadUrl, apiKeysList).uploadFile(mockFile);

    expect(result).toEqual('ipfs://testCid');
  });

  it('should throw an error when no API keys are provided', () => {
    expect(() => new NftStorageService(serviceUrl, uploadUrl, [])).toThrow(dictionary.errors.noApiKeys);
  });
});
