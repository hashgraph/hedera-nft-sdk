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
import { AWSService } from '../../services/file-storages/aws/aws-service';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

jest.mock('@aws-sdk/client-s3');
jest.mock('@aws-sdk/lib-storage');

describe('AWSService', () => {
  const awsAccessKeyId = 'myAwsAccessKeyId';
  const awsSecretAccessKey = 'myAwsSecretAccessKey';
  const awsS3Region = 'myAwsS3Region';
  const awsS3Bucket = 'myAwsS3Bucket';

  let awsService: AWSService;

  beforeEach(() => {
    (S3Client as jest.Mock).mockClear();
    (Upload as unknown as jest.Mock).mockClear();

    awsService = new AWSService(awsAccessKeyId, awsSecretAccessKey, awsS3Region, awsS3Bucket);
  });

  it('should upload a file successfully', async () => {
    const mockFile = new Blob([new Uint8Array([1, 2, 3])]);

    (Upload as unknown as jest.Mock).mockImplementation(() => ({
      done: jest.fn().mockResolvedValue({}),
    }));

    const result = await awsService.uploadFile(mockFile);

    expect(result).toEqual(expect.stringMatching(/^https:\/\/myAwsS3Bucket\.s3\.amazonaws\.com\/\d+\.json$/));
  });

  it('should throw an error when AWS S3 client is not initialized', async () => {
    awsService.client = null;
    const mockFile = new Blob([new Uint8Array([1, 2, 3])]);

    await expect(awsService.uploadFile(mockFile)).rejects.toThrow('No AWS S3 client initialized!');
  });

  it('should throw an error when upload fails', async () => {
    const mockFile = new Blob([new Uint8Array([1, 2, 3])]);

    (Upload as unknown as jest.Mock).mockImplementation(() => ({
      done: jest.fn().mockRejectedValue(new Error('Upload failed')),
    }));

    await expect(awsService.uploadFile(mockFile)).rejects.toThrow('Upload failed');
  });
});
