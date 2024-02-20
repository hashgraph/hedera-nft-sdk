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
import type { Blob } from 'buffer';
import { dictionary } from '../../../utils/constants/dictionary';
import { filetypename } from 'magic-bytes.js';
import { errorToMessage } from '../../../helpers/error-to-message';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { FileStorage } from '../../../types/file-storage-service';

export class AWSS3UploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AWSS3UploadError';
  }
}

export class AWSService implements FileStorage {
  public client: S3Client | null = null;
  public awsAccessKeyId?: string;
  public awsSecretAccessKey?: string;
  public awsS3Region?: string;
  public awsS3Bucket?: string;

  constructor(awsAccessKeyId: string, awsSecretAccessKey: string, awsS3Region: string, awsS3Bucket: string) {
    this.awsAccessKeyId = awsAccessKeyId;
    this.awsSecretAccessKey = awsSecretAccessKey;
    this.awsS3Region = awsS3Region;
    this.awsS3Bucket = awsS3Bucket;

    this.client = new S3Client({
      credentials: {
        accessKeyId: this.awsAccessKeyId,
        secretAccessKey: this.awsSecretAccessKey,
      },
      region: this.awsS3Region,
    });
  }

  public async uploadFile(file: Blob): Promise<string> {
    if (!this.client) {
      throw new AWSS3UploadError('No AWS S3 client initialized!');
    }

    const buffer = new Uint8Array(await file.arrayBuffer());
    const fileTypeFromBufferInstance = filetypename(buffer);

    const fileName = `${Date.now().toString()}.${fileTypeFromBufferInstance[0] ?? 'json'}`;

    try {
      const res = new Upload({
        client: this.client,
        params: {
          ACL: 'public-read',
          Bucket: this.awsS3Bucket,
          Key: fileName,
          Body: buffer,
          ContentType: file.type || 'application/octet-stream', // Set the Content-Type header
        },
        tags: [],
        queueSize: 4,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false, // optional manually handle dropped parts
      });

      const resDone = await res.done();

      if (!resDone) {
        throw new AWSS3UploadError(dictionary.errors.awsUploadIssue);
      }

      return `https://${this.awsS3Bucket}.s3.amazonaws.com/${fileName}`;
    } catch (error) {
      throw new AWSS3UploadError(dictionary.errors.awsUploadingError(errorToMessage(error)));
    }
  }
}
