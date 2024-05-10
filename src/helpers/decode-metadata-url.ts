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
import { dictionary } from '../utils/constants/dictionary';
import { errorToMessage } from './error-to-message';

export const decodeMetadataURL = (metadataURL: string, ipfsGateway?: string, isMetadataURLBase64?: boolean): string => {
  let decodedURL = '';
  try {
    decodedURL = isMetadataURLBase64 ? atob(metadataURL) : metadataURL;
  } catch (error) {
    throw new Error(errorToMessage(error));
  }

  if (!decodedURL.startsWith('https://') && !decodedURL.startsWith('http://') && !ipfsGateway) {
    throw new Error(dictionary.errors.ipfsGatewayRequired);
  }

  if (decodedURL.startsWith('ipfs://') && ipfsGateway) {
    decodedURL = decodedURL.replace('ipfs://', ipfsGateway);
  } else if (!decodedURL.startsWith('https://') && !decodedURL.startsWith('http://') && ipfsGateway) {
    decodedURL = `${ipfsGateway}${decodedURL}`;
  }

  return decodedURL;
};
