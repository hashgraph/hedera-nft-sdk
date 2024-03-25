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
import { validatePropsForCreateCollection } from '../utils/validate-props';
import { tokenCreateUsage } from './token-create-usage';
import { FeeTool } from '../helpers/calculate-price';
import { EstimateCreateCollectionType } from '../types/estimate-create-collection';
import { getTokenCreateWithFeesUsage } from '../helpers/get-token-create-with-fees-usage';

export const estimateCreateCollectionInDollars = ({
  collectionName,
  collectionSymbol,
  keys,
  treasuryAccount,
  treasuryAccountPrivateKey,
  customFees,
}: EstimateCreateCollectionType): number => {
  validatePropsForCreateCollection({
    collectionName,
    collectionSymbol,
    treasuryAccount,
    treasuryAccountPrivateKey,
    customFees,
  });

  const tokenUsage = tokenCreateUsage({
    collectionName,
    collectionSymbol,
    keys,
    treasuryAccount,
  });

  if (customFees && customFees.length > 0) {
    const usage = getTokenCreateWithFeesUsage({ tokenUsage, customFees });
    return usage ? FeeTool.getCreateTokenWithFeesCost(usage) : 0;
  }

  return tokenUsage ? FeeTool.getCreateTokenCost(tokenUsage) : 0;
};
