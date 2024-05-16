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
import { v4 } from 'uuid';
import axios from 'axios';
export class PinataService {
  serviceUrl = 'https://api.pinata.cloud/';
  uploadUrl = 'pinning/pinFileToIPFS';
  constructor(pinataJwtKey, pinataApiKey, pinataSecretApiKey) {
    this.pinataJwtKey = pinataJwtKey;
    this.pinataApiKey = pinataApiKey;
    this.pinataSecretApiKey = pinataSecretApiKey;
    if (!(pinataJwtKey || pinataApiKey && pinataSecretApiKey)) {
      throw new Error(dictionary.errors.pinataError);
    }
    this.instance = axios.create({
      baseURL: this.serviceUrl
    });
  }
  async uploadFile(file) {
    const formData = new FormData();
    // @ts-expect-error Argument of type 'Blob' is assignable to parameter of type 'import("buffer").Blob
    formData.append('file', file);
    formData.append('pinataMetadata', JSON.stringify({
      name: v4()
    }));
    formData.append('pinataOptions', JSON.stringify({
      metadataUriVersion: 0
    }));
    const authorization = this.pinataJwtKey ? {
      Authorization: `Bearer ${this.pinataJwtKey}`
    } : {
      pinata_api_key: this.pinataApiKey,
      pinata_secret_api_key: this.pinataSecretApiKey
    };
    const res = await this.instance.post(this.uploadUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...authorization
      }
    });
    return `ipfs://${res.data.IpfsHash}`;
  }
}
//# sourceMappingURL=pinata-service.js.map