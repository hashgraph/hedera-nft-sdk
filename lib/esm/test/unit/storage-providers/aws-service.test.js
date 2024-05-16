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
import { AWSService } from '../../../services/file-storages/aws/aws-service';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { AWS_RES_DONE } from '../../__mocks__/aws';
import { Blob } from 'buffer';
jest.mock('@aws-sdk/client-s3');
jest.mock('@aws-sdk/lib-storage');
describe('AWSService', () => {
  const awsAccessKeyId = 'myAwsAccessKeyId';
  const awsSecretAccessKey = 'myAwsSecretAccessKey';
  const awsS3Region = 'myAwsS3Region';
  const awsS3Bucket = 'myAwsS3Bucket';
  let awsService;
  beforeEach(() => {
    S3Client.mockClear();
    Upload.mockClear();
    awsService = new AWSService(awsAccessKeyId, awsSecretAccessKey, awsS3Region, awsS3Bucket);
  });
  it('should upload a file successfully', async () => {
    const mockFile = new Blob([new Uint8Array([1, 2, 3])]);
    Upload.mockImplementation(() => ({
      done: jest.fn().mockResolvedValue(AWS_RES_DONE)
    }));
    const result = await awsService.uploadFile(mockFile);
    expect(result).toEqual('https://hederatest.s3.eu-central-1.amazonaws.com/1708599289764.jpg');
  });
  it('should throw an error when upload fails', async () => {
    const mockFile = new Blob([new Uint8Array([1, 2, 3])]);
    Upload.mockImplementation(() => ({
      done: jest.fn().mockRejectedValue(new Error('Upload failed'))
    }));
    await expect(awsService.uploadFile(mockFile)).rejects.toThrow('Upload failed');
  });
});
//# sourceMappingURL=aws-service.test.js.map