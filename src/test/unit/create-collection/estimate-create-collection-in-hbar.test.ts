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
import { myAccountId, mySecondAccountId } from '../../__mocks__/consts';
import { dictionary } from '../../../utils/constants/dictionary';
import { estimateCreateCollectionInHbar } from '../../../nftSDKFunctions/estimate-create-collection-in-hbar';
import { FeeFactory } from '../../../feeFactory';
import { getHbarPriceInDollars } from '../../../helpers/get-hbar-price-in-dollars';

jest.mock('../../../helpers/get-hbar-price-in-dollars');

let feeFactoryInstance: FeeFactory;

beforeAll(() => {
  feeFactoryInstance = new FeeFactory();
});

describe('estimateCreateCollectionInHbars', () => {
  it('should work properly with default values', async () => {
    (getHbarPriceInDollars as jest.Mock).mockResolvedValue({ priceInDollars: 10 });

    const hbars = await estimateCreateCollectionInHbar({
      collectionName: 'test',
      network: 'testnet',
      collectionSymbol: 'test2',
    });

    expect(hbars).toEqual(0.086112);
  });

  it('should work properly with royalty fee', async () => {
    (getHbarPriceInDollars as jest.Mock).mockResolvedValue({ priceInDollars: 10 });

    const royaltyFee = feeFactoryInstance.royaltyFee({
      collectorAccountId: myAccountId,
      numerator: 11,
      denominator: 100,
      allCollectorsAreExempt: false,
      fallbackFee: {
        allCollectorsAreExempt: false,
        collectorAccountId: mySecondAccountId,
        hbarAmount: 100,
      },
    });

    const hbars = await estimateCreateCollectionInHbar({
      collectionName: 'test',
      network: 'testnet',
      collectionSymbol: 'test2',
      customFees: [royaltyFee],
    });

    expect(hbars).toEqual(0.17235899999999998);
  });

  it('should work properly with fixed fees', async () => {
    (getHbarPriceInDollars as jest.Mock).mockResolvedValue({ priceInDollars: 10 });

    const fixedFee = feeFactoryInstance.fixedFee({
      allCollectorsAreExempt: false,
      collectorAccountId: myAccountId,
      hbarAmount: 100,
    });

    const hbars = await estimateCreateCollectionInHbar({
      collectionName: 'test',
      network: 'testnet',
      collectionSymbol: 'test2',
      customFees: [fixedFee, fixedFee],
    });

    expect(hbars).toEqual(0.172439);
  });

  it('should throw an error when invalid parameters are passed', async () => {
    await expect(
      estimateCreateCollectionInHbar({
        collectionName: '',
        collectionSymbol: '',
        treasuryAccount: '',
        network: 'testnet',
        customFees: [],
      })
    ).rejects.toThrow(dictionary.createCollection.collectionSymbolRequired);
  });
});
