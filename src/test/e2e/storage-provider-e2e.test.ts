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
import fs from 'fs';
import { UploadService } from '../../services/upload-service';
import { NftStorageService } from '../../services/file-storages/nft-storage/nft-storage-service';
import { PinataService } from '../../services/file-storages/pinata/pinata-service';
import { MockStorageService } from '../../services/file-storages/mock-storage/mock-storage-service';
import { nftStorageApiKey, pinataApiKey, pinataJwtKey, pinataSecretApiKey } from './e2e-consts';
import { VERY_LONG_E2E_TIMEOUT } from '../__mocks__/consts';
import { exampleNFTMetadata } from '../__mocks__/exampleNFTMetadata';

describe('UploadService Integration Test', () => {
  let filePath: string;
  let fileBuffer: Buffer;
  let blob: Blob;

  beforeAll(() => {
    filePath = 'src/test/__mocks__/photo.jpeg';
    fileBuffer = fs.readFileSync(filePath);
    blob = new Blob([fileBuffer]);
  });

  test(
    'should upload files successfully using NftStorageService',
    async () => {
      const nftStorageConfig = new NftStorageService('https://api.nft.storage/', 'upload', [nftStorageApiKey]);
      const uploadService = new UploadService(nftStorageConfig);
      const result = await uploadService.uploadFiles([blob]);

      expect(result[0].content).toEqual(blob);
      expect(result[0].url).toBeDefined();
      expect(result).toHaveLength(1);
    },
    VERY_LONG_E2E_TIMEOUT
  );

  test(
    'should upload metadata successfully using NftStorageService',
    async () => {
      const nftStorageConfig = new NftStorageService('https://api.nft.storage/', 'upload', [nftStorageApiKey]);
      const uploadService = new UploadService(nftStorageConfig);
      const result = await uploadService.uploadMetadataList([exampleNFTMetadata]);

      expect(result[0].url).toBeDefined();
      expect(result).toHaveLength(1);
    },
    VERY_LONG_E2E_TIMEOUT
  );

  test(
    'should upload files successfully using PinataService',
    async () => {
      const pinataStorageConfig = new PinataService(pinataJwtKey, pinataApiKey, pinataSecretApiKey);
      const uploadService = new UploadService(pinataStorageConfig);
      const result = await uploadService.uploadFiles([blob]);

      expect(result[0].content).toEqual(blob);
      expect(result[0].url).toBeDefined();
      expect(result).toHaveLength(1);
    },
    VERY_LONG_E2E_TIMEOUT
  );

  test(
    'should upload metadata successfully using PinataService',
    async () => {
      const pinataStorageConfig = new PinataService(pinataJwtKey, pinataApiKey, pinataSecretApiKey);
      const uploadService = new UploadService(pinataStorageConfig);
      const result = await uploadService.uploadMetadataList([exampleNFTMetadata]);

      expect(result[0].url).toBeDefined();
      expect(result).toHaveLength(1);
    },
    VERY_LONG_E2E_TIMEOUT
  );

  test(
    'should upload files successfully using MockStorageService',
    async () => {
      const mockStorageConfig = new MockStorageService();
      const uploadService = new UploadService(mockStorageConfig);
      const result = await uploadService.uploadFiles([blob]);
      expect(result).toBeDefined();
      expect(result[0].url).toEqual(
        'This is only test FileStorage provider. Returned metadataUri is example. ipfs://bafkreidj7l5335mcdw5g5k2keqdmevnzjee342ztgd23hedfqoj6yxjbpq'
      );
    },
    VERY_LONG_E2E_TIMEOUT
  );
});
