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
import { dictionary } from '../utils/constants/dictionary';
import { mintToken } from './mintToken';
import { MintedNFTType, MintTokenType } from '../types/mint-token.module';
import { validatePropsForSharedNFTMinting } from '../utils/validate-props';
import { MintingError } from '../utils/minting-error';

export const mintSharedMetadataFunction = async ({ client, tokenId, amount, batchSize, metaData, supplyKey }: MintTokenType) => {
  validatePropsForSharedNFTMinting({ tokenId, amount, metaData, supplyKey, batchSize });

  const mintedNFTs: MintedNFTType[] = [];
  // Example if amount = 8 and batchSize = 5. NumberOfCalls should be 2. So 8/5 = 1.6. Math.ceil(1.6) = 2. Because Math.ceil rounds up to the next largest integer.
  const numberOfCalls = Math.ceil(amount / batchSize);

  try {
    for (let i = 0; i < numberOfCalls; i++) {
      const metadataBatchArray = new Array(Math.min(batchSize, amount)).fill(metaData);
      amount -= batchSize;
      const mintTokenReceipt = await mintToken(metadataBatchArray, tokenId, supplyKey, client);

      const result: MintedNFTType[] = mintTokenReceipt?.serials.map((longValue) => {
        return {
          content: metaData,
          serialNumber: longValue.toNumber(),
        };
      });

      if (result) {
        mintedNFTs.push(...result);
      }
    }

    return mintedNFTs.flat();
  } catch (error) {
    throw new MintingError(`${dictionary.hederaActions.mintingError} ${error}`, mintedNFTs.flat());
  }
};
