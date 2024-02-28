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
import { dictionary } from '../../utils/constants/dictionary';
import { myAccountId } from '../__mocks__/consts';
import { FixedFeeType } from '../../types/fees';
import { createFixedFeeFunction } from '../../nftSDKFunctions/create-fixed-fee-function';

describe('createFixedFeeFunction', () => {
  it('should create a CustomFixedFee with all properties', () => {
    const fixedFeeType: FixedFeeType = {
      collectorAccountId: myAccountId,
      hbarAmount: 100,
      allCollectorsAreExempt: true,
    };

    const result = createFixedFeeFunction(fixedFeeType);

    expect(result).toBeDefined();
    expect(result._allCollectorsAreExempt).toEqual(fixedFeeType.allCollectorsAreExempt);
  });

  it('should throw an error when Collector account id is not provided', () => {
    expect(() =>
      createFixedFeeFunction({
        collectorAccountId: '',
        hbarAmount: 100,
      })
    ).toThrow(dictionary.hederaActions.cannotParseAccountId);
  });
});
