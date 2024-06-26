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
import { MintedNFTType, MintUniqueTokenType } from '../types/mint-token';
import { validatePropsForUniqueNFTMinting } from '../utils/validate-props';
/**
 * Package below is not browser supported
 * @browserUnsupported
 */
import { MintingError } from '../utils/minting-error';
import { mintToken } from './mint-token';

export const mintUniqueMetadataFunction = async ({
  client,
  tokenId,
  batchSize = 5,
  supplyKey,
  metadataArray,
}: MintUniqueTokenType) => {
  validatePropsForUniqueNFTMinting({
    batchSize,
    tokenId,
    supplyKey,
    metadataArray,
  });
  const mintedNFTs: MintedNFTType[] = [];

  if (!metadataArray.length) throw new Error(dictionary.hederaActions.metadataRequired);

  try {
    const numberOfCalls = Math.ceil(metadataArray.length / batchSize);
    for (let i = 0; i < numberOfCalls; i++) {
      const batch = metadataArray.slice(i * batchSize, (i + 1) * batchSize);
      const mintTokenReceipt = await mintToken(batch, tokenId, supplyKey, client);

      const result: MintedNFTType[] = mintTokenReceipt?.serials.map((longValue, index) => {
        return {
          content: batch[index],
          serialNumber: longValue.toNumber(),
        };
      });

      if (result) {
        mintedNFTs.push(...result);
      }
    }
  } catch (error) {
    throw new MintingError(`${dictionary.hederaActions.mintingError} ${error}`, mintedNFTs.flat());
  }

  return mintedNFTs.flat();
};
