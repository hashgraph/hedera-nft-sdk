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
import { NftId, PrivateKey } from '@hashgraph/sdk';
import {
  validatePropsForCreateCollection,
  validatePropsForFixedFeeFunction,
  validatePropsForIncreaseNFTSupply,
  validatePropsForSharedNFTMinting,
  validatePropsForUniqueNFTMinting,
} from '../../utils/validate-props';
import { dictionary } from '../../utils/constants/dictionary';
import { mockClient } from '../__mocks__/client';
import { myAccountId, myPrivateKey } from '../__mocks__/consts';

describe('validateProps_Value_Errors', () => {
  it('should throw an error if batchSize is greater than 10', () => {
    expect(() => validatePropsForSharedNFTMinting({ batchSize: 11 })).toThrow(dictionary.hederaActions.maxBatchSize);
  });

  it('should throw an error if batchSize is less than 1', () => {
    expect(() => validatePropsForSharedNFTMinting({ batchSize: -1 })).toThrow(dictionary.hederaActions.minBatchSize);
  });

  it('should throw an error if tokenId is not provided', () => {
    expect(() => validatePropsForSharedNFTMinting({ tokenId: '' })).toThrow(dictionary.hederaActions.tokenIdRequired);
  });

  it('should throw an error if metaData is not provided', () => {
    expect(() => validatePropsForSharedNFTMinting({ metaData: '' })).toThrow(dictionary.hederaActions.metadataRequired);
  });

  it('should throw an error if supplyKey is not provided', () => {
    expect(() => validatePropsForSharedNFTMinting({ supplyKey: undefined })).toThrow(dictionary.hederaActions.supplyKeyRequired);
  });
});

describe('validateProps_MultipleProps_Errors', () => {
  it('should throw an error if batchSize is undefined and tokenId is valid', () => {
    expect(() => validatePropsForSharedNFTMinting({ batchSize: undefined, tokenId: 'token123' })).toThrow(
      dictionary.mintToken.batchSizeUndefined
    );
  });

  it('should throw an error if amount is undefined and metaData is valid', () => {
    expect(() => validatePropsForSharedNFTMinting({ amount: undefined, metaData: 'metadata123' })).toThrow(
      dictionary.hederaActions.minAmount
    );
  });

  it('should throw an error if supplyKey is undefined and pathToMetadataURIsFile is valid', () => {
    expect(() =>
      validatePropsForSharedNFTMinting({
        supplyKey: undefined,
        batchSize: 9,
      })
    ).toThrow(dictionary.hederaActions.supplyKeyRequired);
  });
});

describe('validateProps_Success', () => {
  it('should not throw an error if batchSize is a number between 1 and 10', () => {
    expect(() => validatePropsForSharedNFTMinting({ batchSize: 5 })).not.toThrow();
  });

  it('should not throw an error if tokenId is a string', () => {
    expect(() => validatePropsForSharedNFTMinting({ tokenId: 'token123' })).not.toThrow();
  });

  it('should not throw an error if amount is a number greater than 0', () => {
    expect(() => validatePropsForSharedNFTMinting({ amount: 5 })).not.toThrow();
  });

  it('should not throw an error if metaData is a string', () => {
    expect(() => validatePropsForSharedNFTMinting({ metaData: 'metadata123' })).not.toThrow();
  });

  it('should not throw an error if supplyKey is a PrivateKey', () => {
    const privateKey = PrivateKey.generate();
    expect(() => validatePropsForSharedNFTMinting({ supplyKey: privateKey })).not.toThrow();
  });
});

describe('validateProps_For_Unique', () => {
  it('should not throw an error if validatePropsForUniqueNFTMinting and metadataArray is passed', () => {
    expect(() =>
      validatePropsForUniqueNFTMinting({
        metadataArray: ['metadata1', 'metadata2'],
      })
    ).not.toThrow();
  });

  it('should not throw an error if validatePropsForUniqueNFTMinting and pathToMetadataURIsFile is passed', () => {
    expect(() =>
      validatePropsForUniqueNFTMinting({
        pathToMetadataURIsFile: 'path/to/file',
      })
    ).not.toThrow();
  });

  it('should throw an error if validatePropsForUniqueNFTMinting and metadataArray is undefined', () => {
    expect(() =>
      validatePropsForUniqueNFTMinting({
        metadataArray: undefined,
      })
    ).toThrow(dictionary.mintToken.csvOrArrayRequired);
  });

  it('should throw an error if validatePropsForUniqueNFTMinting and metadataArray is undefined', () => {
    expect(() =>
      validatePropsForUniqueNFTMinting({
        batchSize: 5,
      })
    ).toThrow(dictionary.mintToken.csvOrArrayRequired);
  });

  it('should not throw an error if validatePropsForUniqueNFTMinting and metadataArray is provided', () => {
    expect(() =>
      validatePropsForUniqueNFTMinting({
        metadataArray: ['metadata1', 'metadata2'],
      })
    ).not.toThrow();
  });

  it('should not throw an error if validatePropsForUniqueNFTMinting and pathToMetadataURIsFile is provided', () => {
    expect(() =>
      validatePropsForUniqueNFTMinting({
        pathToMetadataURIsFile: 'path/to/file',
      })
    ).not.toThrow();
  });

  it('should throw an error if validatePropsForUniqueNFTMinting and both metadataArray and pathToMetadataURIsFile are undefined', () => {
    expect(() =>
      validatePropsForUniqueNFTMinting({
        metadataArray: undefined,
        pathToMetadataURIsFile: undefined,
      })
    ).toThrow(dictionary.mintToken.csvOrArrayRequired);
  });
});

describe('validatePropsForCreateCollection', () => {
  it('should throw an error if collectionName is not provided', () => {
    expect(() =>
      validatePropsForCreateCollection({
        treasuryAccount: myAccountId,
        treasuryAccountPrivateKey: myPrivateKey,
        collectionSymbol: 'TST',
        collectionName: '',
        client: mockClient,
      })
    ).toThrow(new Error(dictionary.createCollection.collectionNameRequired));
  });

  it('should throw an error if collectionSymbol is not provided', () => {
    expect(() =>
      validatePropsForCreateCollection({
        treasuryAccount: myAccountId,
        treasuryAccountPrivateKey: myPrivateKey,
        collectionName: 'Test Collection',
        collectionSymbol: '',
        client: mockClient,
      })
    ).toThrow(new Error(dictionary.createCollection.collectionSymbolRequired));
  });

  it('should throw an error if client is not provided', () => {
    expect(() =>
      validatePropsForCreateCollection({
        treasuryAccount: myAccountId,
        treasuryAccountPrivateKey: myPrivateKey,
        collectionName: 'Test Collection',
        collectionSymbol: 'TST',
        client: undefined,
      })
    ).toThrow(new Error(dictionary.createCollection.clientRequired));
  });
});

describe('validatePropsForIncreaseNFTSupply', () => {
  it('should throw an error if nftId is not provided', () => {
    expect(() =>
      validatePropsForIncreaseNFTSupply({
        amount: 10,
        batchSize: 5,
        supplyKey: PrivateKey.generate(),
        nftId: undefined,
      })
    ).toThrow(new Error(dictionary.hederaActions.nftIdRequired));
  });

  it('should throw an error if amount is not provided', () => {
    expect(() =>
      validatePropsForIncreaseNFTSupply({
        nftId: NftId.fromString('0.0.453/1'),
        batchSize: 5,
        supplyKey: PrivateKey.generate(),
        amount: undefined,
      })
    ).toThrow(new Error(dictionary.hederaActions.minAmount));
  });

  it('should throw an error if supplyKey is not provided', () => {
    expect(() =>
      validatePropsForIncreaseNFTSupply({
        nftId: NftId.fromString('0.0.453/1'),
        amount: 10,
        batchSize: 5,
        supplyKey: undefined,
      })
    ).toThrow(new Error(dictionary.hederaActions.supplyKeyRequired));
  });

  it('should throw an error if batchSize is not provided', () => {
    expect(() =>
      validatePropsForIncreaseNFTSupply({
        nftId: NftId.fromString('0.0.453/1'),
        amount: 10,
        supplyKey: PrivateKey.generate(),
        batchSize: undefined,
      })
    ).toThrow(new Error(dictionary.mintToken.batchSizeUndefined));
  });
});

describe('validatePropsForFixedFeeFunction', () => {
  it('should throw an error if hbarAmount, amount, and denominatingTokenId are not set', () => {
    expect(() => validatePropsForFixedFeeFunction({})).toThrow(dictionary.createCollection.hbarAmountOrAmountAndDenominatingToken);
  });

  it('should throw an error if only denominatingTokenId is set', () => {
    expect(() => validatePropsForFixedFeeFunction({ denominatingTokenId: '0.0.1' })).toThrow(
      dictionary.createCollection.hbarAmountOrAmountAndDenominatingToken
    );
  });

  it('should throw an error if only amount is set', () => {
    expect(() => validatePropsForFixedFeeFunction({ amount: 1 })).toThrow(
      dictionary.createCollection.hbarAmountOrAmountAndDenominatingToken
    );
  });

  it('should not throw an error if amount and denominatingTokenId are set', () => {
    expect(() => validatePropsForFixedFeeFunction({ amount: 1, denominatingTokenId: '0.0.1' })).not.toThrow();
  });

  it('should not throw an error if only hbarAmount is set', () => {
    expect(() => validatePropsForFixedFeeFunction({ hbarAmount: 1 })).not.toThrow();
  });

  it('should throw an error if hbarAmount and denominatingTokenId are set', () => {
    expect(() => validatePropsForFixedFeeFunction({ hbarAmount: 1, denominatingTokenId: '0.0.1' })).toThrow(
      dictionary.createCollection.hbarAmountOrAmountAndDenominatingToken
    );
  });

  it('should throw an error if hbarAmount and amount are set', () => {
    expect(() => validatePropsForFixedFeeFunction({ hbarAmount: 1, amount: 1 })).toThrow(
      dictionary.createCollection.hbarAmountOrAmountAndDenominatingToken
    );
  });

  it('should throw an error if hbarAmount, amount, and denominatingTokenId are set', () => {
    expect(() =>
      validatePropsForFixedFeeFunction({
        hbarAmount: 1,
        amount: 1,
        denominatingTokenId: '0.0.1',
      })
    ).toThrow(dictionary.createCollection.hbarAmountOrAmountAndDenominatingToken);
  });
});
