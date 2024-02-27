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
import { feeFactoryInstance, nftSDK } from './e2e-consts';
import { myAccountId, mySecondAccountId } from '../__mocks__/consts';
import { CustomFixedFee, CustomRoyaltyFee, TokenInfoQuery } from '@hashgraph/sdk';
import { dictionary } from '../../utils/constants/dictionary';

afterAll(async () => {
  nftSDK.client.close();
});

describe('feeFactory', () => {
  it('creates a collection with fixedFee', async () => {
    const fixedFee = feeFactoryInstance.fixedFee({
      allCollectorsAreExempt: false,
      collectorAccountId: myAccountId,
      hbarAmount: 100,
    });

    const tokenId = await nftSDK.createCollection({
      collectionName: 'test_name',
      collectionSymbol: 'test_symbol',
      customFees: [fixedFee],
    });

    const query = new TokenInfoQuery().setTokenId(tokenId);
    const tokenInfo = await query.execute(nftSDK.client);
    const customFees = tokenInfo.customFees;
    let customFeeAccId = undefined;

    if (customFees.length > 0 && customFees[0] instanceof CustomFixedFee) {
      customFeeAccId = customFees[0]._feeCollectorAccountId!.toString();
    }

    expect(customFeeAccId).toEqual(myAccountId);
    expect(tokenId).toBeDefined();
  });

  it('creates a collection with royaltyFee', async () => {
    const royaltyFee = feeFactoryInstance.royaltyFee({
      collectorAccountId: myAccountId,
      numerator: 1,
      denominator: 100,
      allCollectorsAreExempt: false,
      fallbackFee: {
        allCollectorsAreExempt: false,
        collectorAccountId: mySecondAccountId,
        hbarAmount: 100,
      },
    });

    const tokenId = await nftSDK.createCollection({
      collectionName: 'test_name',
      collectionSymbol: 'test_symbol',
      customFees: [royaltyFee],
    });

    const query = new TokenInfoQuery().setTokenId(tokenId);
    const tokenInfo = await query.execute(nftSDK.client);
    const customFees = tokenInfo.customFees;
    let customFeeDenominator = undefined;
    let customFeeNumenator = undefined;

    if (customFees.length > 0 && customFees[0] instanceof CustomRoyaltyFee) {
      customFeeDenominator = customFees[0]._denominator.toInt();
      customFeeNumenator = customFees[0]._numerator.toString();
    }

    expect(Number(customFeeNumenator)).toEqual(royaltyFee.numerator.toInt());
    expect(customFeeDenominator).toEqual(royaltyFee.denominator.toInt());
    expect(tokenId).toBeDefined();
  });

  it('creates a collection with royaltyFee and fixedFee', async () => {
    const royaltyFee = feeFactoryInstance.royaltyFee({
      collectorAccountId: myAccountId,
      numerator: 1,
      denominator: 100,
      allCollectorsAreExempt: false,
      fallbackFee: {
        allCollectorsAreExempt: false,
        collectorAccountId: mySecondAccountId,
        hbarAmount: 100,
      },
    });

    const fixedFee = feeFactoryInstance.fixedFee({
      allCollectorsAreExempt: false,
      collectorAccountId: myAccountId,
      hbarAmount: 100,
    });

    const tokenId = await nftSDK.createCollection({
      collectionName: 'test_name',
      collectionSymbol: 'test_symbol',
      customFees: [royaltyFee, fixedFee],
    });

    const query = new TokenInfoQuery().setTokenId(tokenId);
    const tokenInfo = await query.execute(nftSDK.client);
    const customFees = tokenInfo.customFees;
    let customFeeDenominator = undefined;
    let customFeeNumenator = undefined;

    if (customFees.length > 0 && customFees[0] instanceof CustomRoyaltyFee) {
      customFeeDenominator = customFees[0]._denominator.toInt();
      customFeeNumenator = customFees[0]._numerator.toString();
    }

    expect(Number(customFeeNumenator)).toEqual(royaltyFee.numerator.toInt());
    expect(customFeeDenominator).toEqual(royaltyFee.denominator.toInt());
    expect(tokenId).toBeDefined();
  });

  it('throws error when more than 10 customFees', async () => {
    const fixedFee = feeFactoryInstance.fixedFee({
      allCollectorsAreExempt: false,
      collectorAccountId: myAccountId,
      amount: 100,
      denominatingTokenId: myAccountId,
    });

    await expect(
      nftSDK.createCollection({
        collectionName: 'test_name',
        collectionSymbol: 'test_symbol',
        customFees: [fixedFee, fixedFee, fixedFee, fixedFee, fixedFee, fixedFee, fixedFee, fixedFee, fixedFee, fixedFee, fixedFee],
      })
    ).rejects.toThrow(dictionary.hederaActions.tooManyCustomFees);
  });
});
