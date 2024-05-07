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
import { FileStorageUploadUrl, FileStorageURL } from '../../upload-service';
import { FileStorage } from '../../../types/file-storage-service';
import axios, { AxiosInstance } from 'axios';
import random from 'lodash/random';

interface NFTStorageUploadResponseValue {
  cid: string;
  created: string;
  type: string;
  scope: string;
  files: File[];
  size: number;
  name: string;
  pin?: {
    cid: string;
    created: string;
    size: number;
    status: string;
  };
  deals: unknown[];
}

interface NFTStorageUploadResponse {
  ok: boolean;
  value: NFTStorageUploadResponseValue;
}

export class NftStorageService implements FileStorage {
  public serviceUrl: FileStorageURL = 'https://api.nft.storage/';
  public uploadUrl: FileStorageUploadUrl = 'upload';
  private instance: AxiosInstance;
  public apiKeysList: string[] = [];

  constructor(serviceUrl: FileStorageURL, uploadUrl: FileStorageUploadUrl, apiKeysList: string[]) {
    this.serviceUrl = serviceUrl;
    this.uploadUrl = uploadUrl;
    this.apiKeysList = apiKeysList;

    if (apiKeysList.length <= 0) {
      throw new Error(dictionary.errors.noApiKeys);
    }

    this.instance = axios.create({
      baseURL: this.serviceUrl,
    });
  }

  public async uploadFile(file: Blob): Promise<string> {
    const key = this.apiKeysList[random(0, this.apiKeysList.length - 1)];

    const {
      data: {
        value: { cid },
      },
    } = await this.instance.post<NFTStorageUploadResponse>(this.uploadUrl, file, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    return `ipfs://${cid}`;
  }
}
