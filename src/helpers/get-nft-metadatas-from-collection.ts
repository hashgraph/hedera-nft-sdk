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
import { getMetadataObjectsForValidation, getNFTsFromToken } from '../api/mirror-node';
import { uriDecoder } from './uri-decoder';
import { NetworkName } from '@hashgraph/sdk/lib/client/Client';
export const getNftMetadataFromCollection = async (network: NetworkName, tokenId: string, limit: number, ipfsGateway?: string) => {
  const nfts = await getNFTsFromToken(network, tokenId, limit);

  const decodedMetadataArray = uriDecoder(nfts, ipfsGateway);

  return Promise.all(
    decodedMetadataArray.map(async ({ metadata, serialNumber }) => {
      return getMetadataObjectsForValidation(metadata, serialNumber);
    })
  );
};
