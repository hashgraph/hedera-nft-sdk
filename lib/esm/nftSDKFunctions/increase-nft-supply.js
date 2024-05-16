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
import { validatePropsForIncreaseNFTSupply } from '../utils/validate-props';
import { mintSharedMetadataFunction } from './mint-shared-metadata-function';
import { getMetaDataFromMirrorNode } from '../api/mirror-node';
export const increaseNFTSupply = async ({
  client,
  network,
  nftId,
  amount,
  batchSize,
  supplyKey,
  mirrorNodeUrl
}) => {
  validatePropsForIncreaseNFTSupply({
    amount,
    batchSize
  });
  return getMetaDataFromMirrorNode(network, nftId, mirrorNodeUrl).then(metaData => mintSharedMetadataFunction({
    client,
    tokenId: nftId.tokenId.toString(),
    amount,
    batchSize,
    metaData,
    supplyKey
  }));
};
//# sourceMappingURL=increase-nft-supply.js.map