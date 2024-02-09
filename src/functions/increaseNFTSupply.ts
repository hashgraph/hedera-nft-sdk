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
import { NftId } from '@hashgraph/sdk';
import axios from 'axios';
import { mintSharedMetadataFunction } from './mintSharedMetadataFunction';
import { validatePropsForIncreaseNFTSupply } from '../utils/validate-props';
import { IncreaseNFTSupplyType } from '../types/mint-token.module';

export const increaseNFTSupply = async ({ client, network, nftId, amount, batchSize, supplyKey, mirrorNodeUrl }: IncreaseNFTSupplyType) => {
  validatePropsForIncreaseNFTSupply({ nftId, amount, supplyKey, batchSize });
  return getMetaDataFromMirrorNode(network, nftId, mirrorNodeUrl).then((metaData) =>
    mintSharedMetadataFunction({ client, tokenId: nftId.tokenId.toString(), amount, batchSize, metaData, supplyKey })
  );
};

async function getMetaDataFromMirrorNode(network: string, nftId: NftId, mirrorNodeUrl?: string): Promise<string> {
  const url = mirrorNodeUrl || getMirrorNodeUrlForNetwork(network);
  return axios.get(`${url}/tokens/${nftId.tokenId.toString()}/nfts/${nftId.serial.toString()}`).then((response) => {
    //atob is used to decode the base64 encoded metadata
    return atob(response.data.metadata);
  });
}

function getMirrorNodeUrlForNetwork(network: string): string {
  return `https://${network === 'mainnet' ? 'mainnet-public' : network}.mirrornode.hedera.com/api/v1`;
}
