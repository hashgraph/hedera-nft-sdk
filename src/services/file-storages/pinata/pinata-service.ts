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
import type { Blob } from 'buffer';
import { dictionary } from '../../../utils/constants/dictionary';
import { randomUUID } from 'crypto';
import axios, { type AxiosInstance } from 'axios';
import { FileStorageUploadUrl, FileStorageURL } from '../../upload-service';
import { FileStorage } from '../../../types/file-storage-service';

export class PinataService implements FileStorage {
  private serviceUrl: FileStorageURL = 'https://api.pinata.cloud/';
  private uploadUrl: FileStorageUploadUrl = 'pinning/pinFileToIPFS';
  private instance: AxiosInstance;
  public pinataJwtKey?: string;
  public pinataApiKey?: string;
  public pinataSecretApiKey?: string;

  constructor(pinataJwtKey?: string, pinataApiKey?: string, pinataSecretApiKey?: string) {
    this.pinataJwtKey = pinataJwtKey;
    this.pinataApiKey = pinataApiKey;
    this.pinataSecretApiKey = pinataSecretApiKey;

    if (!(pinataJwtKey || (pinataApiKey && pinataSecretApiKey))) {
      throw new Error(dictionary.errors.pinataError);
    }

    this.instance = axios.create({
      baseURL: this.serviceUrl,
    });
  }

  public async uploadFile(file: Blob): Promise<string> {
    const formData = new FormData();

    formData.append('file', file);

    formData.append(
      'pinataMetadata',
      JSON.stringify({
        name: randomUUID(),
      })
    );

    formData.append(
      'pinataOptions',
      JSON.stringify({
        metadataUriVersion: 0,
      })
    );

    const authorization = this.pinataJwtKey
      ? {
          Authorization: `Bearer ${this.pinataJwtKey}`,
        }
      : {
          pinata_api_key: this.pinataApiKey,
          pinata_secret_api_key: this.pinataSecretApiKey,
        };

    const res = await this.instance.post(this.uploadUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...authorization,
      },
    });

    return `ipfs://${res.data.IpfsHash}`;
  }
}
