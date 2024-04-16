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
import fs from 'fs';
import { UploadService } from '../../services/upload-service';
import { NftStorageService } from '../../services/file-storages/nft-storage/nft-storage-service';
import { PinataService } from '../../services/file-storages/pinata/pinata-service';
import { MockStorageService } from '../../services/file-storages/mock-storage/mock-storage-service';
import { awsSecretKey, awsAccessKey, nftStorageApiKey, pinataApiKey, pinataJwtKey, pinataSecretApiKey } from './e2e-consts';
import { LONG_E2E_TIMEOUT } from '../__mocks__/consts';
import { exampleNFTMetadata } from '../__mocks__/exampleNFTMetadata';
import { AWSService } from '../../services/file-storages/aws/aws-service';

const itif = (condition: any) => (condition ? it : it.skip);

describe('UploadService E2E Test', () => {
  let filePath: string;
  let fileBuffer: Buffer;
  let blob: Blob;

  beforeAll(() => {
    filePath = 'src/test/__mocks__/exampleFiles/photo.jpeg';
    fileBuffer = fs.readFileSync(filePath);
    blob = new Blob([fileBuffer]);
  });

  itif(awsAccessKey && awsSecretKey)(
    'should upload files successfully using AWSService',
    async () => {
      const awsStorageConfig = new AWSService(awsAccessKey, awsSecretKey, 'eu-central-1', 'hederatest');
      const uploadService = new UploadService(awsStorageConfig);
      const result = await uploadService.uploadBlobFiles([blob]);

      expect(result[0].content).toEqual(blob);
      expect(result[0].url).toBeDefined();
      expect(result).toHaveLength(1);
    },
    LONG_E2E_TIMEOUT
  );

  itif(awsAccessKey && awsSecretKey)(
    'should upload file by path successfully using AWSService',
    async () => {
      const awsStorageConfig = new AWSService(awsAccessKey, awsSecretKey, 'eu-central-1', 'hederatest');
      const uploadService = new UploadService(awsStorageConfig);
      const result = await uploadService.uploadFilesFromPath([filePath]);

      expect(result[0].url).toBeDefined();
      expect(result).toHaveLength(1);
    },
    LONG_E2E_TIMEOUT
  );

  itif(awsAccessKey && awsSecretKey)(
    'should upload files by path directory successfully using AWSService',
    async () => {
      const awsStorageConfig = new AWSService(awsAccessKey, awsSecretKey, 'eu-central-1', 'hederatest');
      const uploadService = new UploadService(awsStorageConfig);
      const result = await uploadService.uploadFilesFromPath(['src/test/__mocks__/exampleFiles']);

      expect(result[0].url).toBeDefined();
      expect(result[1].url).toBeDefined();
      expect(result).toHaveLength(2);
    },
    LONG_E2E_TIMEOUT
  );

  itif(awsAccessKey && awsSecretKey)(
    'should upload metadata successfully using AWSService',
    async () => {
      const awsStorageConfig = new AWSService(awsAccessKey, awsSecretKey, 'eu-central-1', 'hederatest');
      const uploadService = new UploadService(awsStorageConfig);
      const result = await uploadService.uploadMetadataList([exampleNFTMetadata]);

      expect(result[0].url).toBeDefined();
      expect(result).toHaveLength(1);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'should upload files successfully using NftStorageService',
    async () => {
      const nftStorageConfig = new NftStorageService('https://api.nft.storage/', 'upload', [nftStorageApiKey]);
      const uploadService = new UploadService(nftStorageConfig);
      const result = await uploadService.uploadBlobFiles([blob]);

      expect(result[0].content).toEqual(blob);
      expect(result[0].url).toBeDefined();
      expect(result).toHaveLength(1);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'should upload file by path successfully using NftStorageService',
    async () => {
      const nftStorageConfig = new NftStorageService('https://api.nft.storage/', 'upload', [nftStorageApiKey]);
      const uploadService = new UploadService(nftStorageConfig);
      const result = await uploadService.uploadFilesFromPath([filePath]);

      expect(result[0].url).toBeDefined();
      expect(result).toHaveLength(1);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'should upload files by path directory successfully using NftStorageService',
    async () => {
      const nftStorageConfig = new NftStorageService('https://api.nft.storage/', 'upload', [nftStorageApiKey]);
      const uploadService = new UploadService(nftStorageConfig);
      const result = await uploadService.uploadFilesFromPath(['src/test/__mocks__/exampleFiles']);

      expect(result[0].url).toBeDefined();
      expect(result[1].url).toBeDefined();
      expect(result).toHaveLength(2);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'should upload metadata successfully using NftStorageService',
    async () => {
      const nftStorageConfig = new NftStorageService('https://api.nft.storage/', 'upload', [nftStorageApiKey]);
      const uploadService = new UploadService(nftStorageConfig);
      const result = await uploadService.uploadMetadataList([exampleNFTMetadata]);

      expect(result[0].url).toBeDefined();
      expect(result).toHaveLength(1);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'should upload files successfully using PinataService',
    async () => {
      const pinataStorageConfig = new PinataService(pinataJwtKey, pinataApiKey, pinataSecretApiKey);
      const uploadService = new UploadService(pinataStorageConfig);
      const result = await uploadService.uploadBlobFiles([blob]);

      expect(result[0].content).toEqual(blob);
      expect(result[0].url).toBeDefined();
      expect(result).toHaveLength(1);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'should upload file by path successfully using PinataService',
    async () => {
      const pinataStorageConfig = new PinataService(pinataJwtKey, pinataApiKey, pinataSecretApiKey);
      const uploadService = new UploadService(pinataStorageConfig);
      const result = await uploadService.uploadFilesFromPath([filePath]);

      expect(result[0].url).toBeDefined();
      expect(result).toHaveLength(1);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'should upload files by path directory successfully using PinataService',
    async () => {
      const pinataStorageConfig = new PinataService(pinataJwtKey, pinataApiKey, pinataSecretApiKey);
      const uploadService = new UploadService(pinataStorageConfig);
      const result = await uploadService.uploadFilesFromPath(['src/test/__mocks__/exampleFiles']);

      expect(result[0].url).toBeDefined();
      expect(result[1].url).toBeDefined();
      expect(result).toHaveLength(2);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'should upload metadata successfully using PinataService',
    async () => {
      const pinataStorageConfig = new PinataService(pinataJwtKey, pinataApiKey, pinataSecretApiKey);
      const uploadService = new UploadService(pinataStorageConfig);
      const result = await uploadService.uploadMetadataList([exampleNFTMetadata]);

      expect(result[0].url).toBeDefined();
      expect(result).toHaveLength(1);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'should upload files successfully using MockStorageService',
    async () => {
      const mockStorageConfig = new MockStorageService('https://www.mockstorage.com/');
      const uploadService = new UploadService(mockStorageConfig);
      const result = await uploadService.uploadBlobFiles([blob]);
      expect(result).toBeDefined();
      expect(result[0].url).toEqual('https://www.mockstorage.com/');
    },
    LONG_E2E_TIMEOUT
  );
});
