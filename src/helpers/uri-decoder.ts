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
import { NFTDetails, DecodedMetadata } from '../types/nfts';
import { decodeMetadataUrl } from './decode-metadata-url';

export const uriDecoder = (nfts: NFTDetails | NFTDetails[], ipfsGateway?: string): DecodedMetadata[] => {
  const nftsArray = Array.isArray(nfts) ? nfts : [nfts];
  const decodedMetadataArray: DecodedMetadata[] = nftsArray.map((nft: NFTDetails) => {
    const decodedNFTMetadata = decodeMetadataUrl(nft.metadata, ipfsGateway);

    return {
      metadata: decodedNFTMetadata,
      serialNumber: nft.serial_number,
    };
  });

  return decodedMetadataArray;
};
