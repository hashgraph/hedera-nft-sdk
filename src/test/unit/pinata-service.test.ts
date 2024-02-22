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

  beforeEach(() => {
    const mockResponse = {
      data: {
        IpfsHash: 'testHash',
      },
    };
    mockAxios.create.mockReturnValue(mockAxios);
    mockAxios.post.mockResolvedValue(mockResponse);
  });

  it('should return the expected string when uploadFile is called', async () => {
    const pinataService = new PinataService(pinataJwtKey, pinataApiKey, pinataSecretApiKey);
    const mockFile = new Blob([new Uint8Array([1, 2, 3])]);

    const result = await pinataService.uploadFile(mockFile);

    expect(result).toEqual('ipfs://testHash');
  });

  it('should return the expected string when only JWTToken is passed', async () => {
    const pinataService = new PinataService(pinataJwtKey, undefined, undefined);
    const mockFile = new Blob([new Uint8Array([1, 2, 3])]);

    const result = await pinataService.uploadFile(mockFile);

    expect(result).toEqual('ipfs://testHash');
  });

  it('should return the expected string when only ApiKey and SecretKey is passed', async () => {
    const pinataService = new PinataService(undefined, pinataApiKey, pinataSecretApiKey);
    const mockFile = new Blob([new Uint8Array([1, 2, 3])]);

    const result = await pinataService.uploadFile(mockFile);

    expect(result).toEqual('ipfs://testHash');
  });

  it('should throw an error when no JWT or ApiKey keys are provided', () => {
    expect(() => new PinataService(undefined, undefined, 'test')).toThrow(dictionary.errors.pinataError);
  });

  it('should throw an error when no JWT or SecretKey keys are provided', () => {
    expect(() => new PinataService(undefined, 'test', undefined)).toThrow(dictionary.errors.pinataError);
  });
});
