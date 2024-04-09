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
import { NFTDetails, NFTS, NFTTransactions, NFTTransactionsRequest } from '../types/nfts';
import { dictionary } from '../utils/constants/dictionary';
import { errorToMessage } from '../helpers/error-to-message';
import { NetworkName } from '@hashgraph/sdk/lib/client/Client';
import { getMirrorNodeUrlForNetwork } from '../utils/hedera/get-mirror-node-url-for-network';
import { MetadataObject } from '../types/csv';
import { NFTMetadata } from '../types/nft-metadata';

export type MetadataFromMirrorNode = {
  isSuccessful: boolean;
  metadata?: MetadataObject | NFTMetadata;
  serialNumber: number;
  error?: string;
};

export const getMetaDataFromMirrorNode = async (network: NetworkName, nftId: NftId, mirrorNodeUrl?: string): Promise<string> => {
  const url = mirrorNodeUrl || getMirrorNodeUrlForNetwork(network);
  const response = await axios.get(`${url}/tokens/${nftId.tokenId.toString()}/nfts/${nftId.serial.toString()}`);
  return atob(response.data.metadata);
};

export const getLastOwnershipTransferForNft = async (
  network: NetworkName,
  tokenId: string,
  serialNumber: number,
  mirrorNodeUrl?: string
): Promise<NFTTransactions | undefined> => {
  const baseUrl = mirrorNodeUrl || getMirrorNodeUrlForNetwork(network);
  let nextLink: string = `${baseUrl}/tokens/${tokenId}/nfts/${serialNumber}/transactions`;
  let requiredTransaction: NFTTransactions | undefined;

  do {
    try {
      const response = await axios.get<NFTTransactionsRequest>(nextLink);
      // We take the first 'CRYPTOTRANSFER' or 'TOKENMINT' transaction because these transactions represent the change of ownership of an NFT.
      // 'CRYPTOTRANSFER' indicates that the NFT was transferred from one account to another, while 'TOKENMINT' indicates that a new NFT was minted.
      // By taking the first of these transactions, we can determine the last owner of the NFT and the time when they became the owner
      requiredTransaction = response.data.transactions.find(
        (transaction) => transaction.type === 'CRYPTOTRANSFER' || transaction.type === 'TOKENMINT'
      );
      if (requiredTransaction) break;
      nextLink = response.data.links.next ? new URL(response.data.links.next, baseUrl).href : '';
    } catch (error) {
      throw new Error(errorToMessage(error));
    }
  } while (nextLink);
  return requiredTransaction;
};

export async function getNFTsFromToken(network: NetworkName, tokenId: string, limit: number = 100): Promise<NFTDetails[]> {
  const baseUrl = getMirrorNodeUrlForNetwork(network);
  let nextLink: string = `${baseUrl}/tokens/${tokenId}/nfts?limit=${limit}`;
  const allNFTs: NFTDetails[] = [];

  do {
    try {
      const response = await axios.get<NFTS>(nextLink);
      allNFTs.push(...response.data.nfts);
      nextLink = response.data.links.next ? new URL(response.data.links.next, baseUrl).href : '';
    } catch (error) {
      throw new Error(errorToMessage(error));
    }
  } while (nextLink);
  return allNFTs;
}

export async function getSingleNFTDetails(network: NetworkName, tokenId: string, serialNumber: number): Promise<NFTDetails> {
  const baseUrl = getMirrorNodeUrlForNetwork(network);
  const nftURL = `${baseUrl}/tokens/${tokenId}/nfts/${serialNumber}`;

  try {
    const { data } = await axios.get<NFTDetails>(nftURL);
    return data;
  } catch (error) {
    throw new Error(`${dictionary.errors.unknownErrorWhileFetching(serialNumber)},
    ${errorToMessage(error)}`);
  }
}

export async function getMetadataObjectsForValidation(url: string, serialNumber: number): Promise<MetadataFromMirrorNode> {
  try {
    const response = await axios.get(url);
    return {
      isSuccessful: true,
      metadata: response.data,
      serialNumber,
    };
  } catch (error) {
    let errorMessage = dictionary.errors.ipfsFailedToFetch as string;
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        errorMessage = dictionary.errors.tooManyRequests(error.response.statusText, error.response.status);
      } else {
        errorMessage = dictionary.errors.unknownErrorWhileFetching(serialNumber);
      }
    }

    return {
      isSuccessful: false,
      serialNumber,
      error: errorMessage,
    };
  }
}
