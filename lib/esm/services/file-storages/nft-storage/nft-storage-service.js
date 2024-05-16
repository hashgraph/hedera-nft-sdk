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

import { dictionary } from '../../../utils/constants/dictionary';
import axios from 'axios';
import random from 'lodash/random';
export class NftStorageService {
  serviceUrl = 'https://api.nft.storage/';
  uploadUrl = 'upload';
  apiKeysList = [];
  constructor(serviceUrl, uploadUrl, apiKeysList) {
    this.serviceUrl = serviceUrl;
    this.uploadUrl = uploadUrl;
    this.apiKeysList = apiKeysList;
    if (apiKeysList.length <= 0) {
      throw new Error(dictionary.errors.noApiKeys);
    }
    this.instance = axios.create({
      baseURL: this.serviceUrl
    });
  }
  async uploadFile(file) {
    const key = this.apiKeysList[random(0, this.apiKeysList.length - 1)];
    const {
      data: {
        value: {
          cid
        }
      }
    } = await this.instance.post(this.uploadUrl, file, {
      headers: {
        Authorization: `Bearer ${key}`
      }
    });
    return `ipfs://${cid}`;
  }
}
//# sourceMappingURL=nft-storage-service.js.map