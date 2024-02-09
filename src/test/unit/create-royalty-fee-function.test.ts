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
import { RoyaltyFeeType } from '../../types/fees.module';
import { myAccountId } from '../__mocks__/consts';
import { createRoyaltyFeeFunction } from '../../nftSDKFunctions/create-royalty-fee-function';

describe('createRoyaltyFeeFunction', () => {
  it('should return the correct numerator and denominator', () => {
    const royaltyFeeType: RoyaltyFeeType = {
      collectorAccountId: myAccountId,
      numerator: 1,
      denominator: 2,
      allCollectorsAreExempt: true,
    };

    const result = createRoyaltyFeeFunction(royaltyFeeType);

    expect(result._numerator.toInt()).toEqual(royaltyFeeType.numerator);
    expect(result._denominator.toInt()).toEqual(royaltyFeeType.denominator);
  });

  it('should return the correct fallbackFee when provided', () => {
    const royaltyFeeType: RoyaltyFeeType = {
      collectorAccountId: myAccountId,
      numerator: 1,
      denominator: 2,
      fallbackFee: {
        collectorAccountId: myAccountId,
        amount: 100,
        denominatingTokenId: myAccountId,
        allCollectorsAreExempt: true,
      },
      allCollectorsAreExempt: true,
    };

    const result = createRoyaltyFeeFunction(royaltyFeeType);

    expect(result.fallbackFee?._amount.toInt()).toEqual(royaltyFeeType.fallbackFee?.amount);
  });
});
