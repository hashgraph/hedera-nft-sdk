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
import { PinataService } from '../../services/file-storages/pinata/pinata-service';
import { Blob } from 'buffer';
import axios from 'axios';
import { dictionary } from '../../utils/constants/dictionary';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('PinataService', () => {
  const pinataJwtKey = 'testJwtKey';
  const pinataApiKey = 'testApiKey';
  const pinataSecretApiKey = 'testSecretApiKey';

  let pinataService: PinataService;

  beforeEach(() => {
    const mockResponse = {
      data: {
        IpfsHash: 'testHash',
      },
    };
    mockAxios.create.mockReturnValue(mockAxios);
    mockAxios.post.mockResolvedValue(mockResponse);
    pinataService = new PinataService(pinataJwtKey, pinataApiKey, pinataSecretApiKey);
  });

  it('should return the expected string when uploadFile is called', async () => {
    const mockFile = new Blob([new Uint8Array([1, 2, 3])]);

    const result = await pinataService.uploadFile(mockFile);

    expect(result).toEqual('ipfs://testHash');
  });

  it('should throw an error when no API keys are provided', () => {
    expect(() => new PinataService('', '', '')).toThrow(dictionary.errors.pinataError);
  });
});
