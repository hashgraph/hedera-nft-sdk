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
import { validatePropsForCreateCollection } from '../utils/validate-props';
import { estimateCreateCollectionInDollars } from './estimate-create-collection-in-dollars';
import { getHbarPriceInDollars } from '../helpers/get-hbar-price-in-dollars';
export const estimateCreateCollectionInHbar = async ({
  collectionName,
  collectionSymbol,
  keys,
  treasuryAccount,
  treasuryAccountPrivateKey,
  customFees,
  network,
  mirrorNodeUrl
}) => {
  validatePropsForCreateCollection({
    collectionName,
    collectionSymbol,
    treasuryAccount,
    treasuryAccountPrivateKey,
    customFees
  });
  const totalCostInDollars = estimateCreateCollectionInDollars({
    collectionName,
    collectionSymbol,
    keys,
    treasuryAccount,
    treasuryAccountPrivateKey,
    customFees
  });
  const hbarPrice = await getHbarPriceInDollars(network, mirrorNodeUrl);
  return totalCostInDollars / hbarPrice.priceInDollars;
};
//# sourceMappingURL=estimate-create-collection-in-hbar.js.map