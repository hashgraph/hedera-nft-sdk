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
import { PrivateKey } from '@hashgraph/sdk';
import {
  validatePropsForCreateCollection,
  validatePropsForFixedFeeFunction,
  validatePropsForSharedNFTMinting,
  validatePropsForUniqueNFTMinting,
} from '../../utils/validate-props';
import { dictionary } from '../../utils/constants/dictionary';
import { myAccountId, myPrivateKey } from '../__mocks__/consts';

describe('validateProps_Value_Errors', () => {
  it('should throw an error if batchSize is greater than 10', () => {
    expect(() =>
      validatePropsForSharedNFTMinting({
        batchSize: 11,
        tokenId: '0.0.123',
        amount: 50,
        metaData: 'test',
        supplyKey: PrivateKey.generateED25519(),
      })
    ).toThrow(dictionary.hederaActions.maxBatchSize);
  });

  it('should throw an error if batchSize is less than 1', () => {
    expect(() =>
      validatePropsForSharedNFTMinting({
        batchSize: -1,
        tokenId: '0.0.123',
        amount: 50,
        metaData: 'test',
        supplyKey: PrivateKey.generateED25519(),
      })
    ).toThrow(dictionary.hederaActions.minBatchSize);
  });

  it('should throw an error if tokenId is not provided', () => {
    expect(() =>
      validatePropsForSharedNFTMinting({ tokenId: '', batchSize: 3, amount: 50, metaData: 'test', supplyKey: PrivateKey.generateED25519() })
    ).toThrow(dictionary.hederaActions.cannotParseTokenId);
  });

  it('should throw an error if metaData is not provided', () => {
    expect(() =>
      validatePropsForSharedNFTMinting({
        metaData: '',
        tokenId: '0.0.123',
        batchSize: 3,
        amount: 50,
        supplyKey: PrivateKey.generateED25519(),
      })
    ).toThrow(dictionary.hederaActions.metadataRequired);
  });
});

describe('validateProps_Success', () => {
  it('should not throw an error if batchSize is a number between 1 and 10', () => {
    expect(() =>
      validatePropsForSharedNFTMinting({
        batchSize: 5,
        tokenId: '0.0.123',
        amount: 50,
        metaData: 'test',
        supplyKey: PrivateKey.generateED25519(),
      })
    ).not.toThrow();
  });

  it('should not throw an error if tokenId is valid', () => {
    expect(() =>
      validatePropsForSharedNFTMinting({
        tokenId: '0.0.123',
        amount: 50,
        metaData: 'test',
        supplyKey: PrivateKey.generateED25519(),
        batchSize: 5,
      })
    ).not.toThrow();
  });

  it('should not throw an error if amount is a number greater than 0', () => {
    expect(() =>
      validatePropsForSharedNFTMinting({
        amount: 5,
        tokenId: '0.0.123',
        metaData: 'test',
        supplyKey: PrivateKey.generateED25519(),
        batchSize: 5,
      })
    ).not.toThrow();
  });

  it('should not throw an error if metaData is a string', () => {
    expect(() =>
      validatePropsForSharedNFTMinting({
        metaData: 'metadata123',
        amount: 5,
        tokenId: '0.0.123',
        supplyKey: PrivateKey.generateED25519(),
        batchSize: 5,
      })
    ).not.toThrow();
  });

  it('should not throw an error if supplyKey is a PrivateKey', () => {
    const privateKey = PrivateKey.generate();
    expect(() =>
      validatePropsForSharedNFTMinting({ supplyKey: privateKey, metaData: 'metadata123', amount: 5, tokenId: '0.0.123', batchSize: 5 })
    ).not.toThrow();
  });
});

describe('validateProps_For_Unique', () => {
  it('should not throw an error if validatePropsForUniqueNFTMinting and metadataArray is passed', () => {
    expect(() =>
      validatePropsForUniqueNFTMinting({
        metadataArray: ['metadata1', 'metadata2'],
        batchSize: 5,
        tokenId: '0.0.123',
        supplyKey: PrivateKey.generateED25519(),
      })
    ).not.toThrow();
  });

  it('should not throw an error if validatePropsForUniqueNFTMinting and pathToMetadataURIsFile is passed', () => {
    expect(() =>
      validatePropsForUniqueNFTMinting({
        pathToMetadataURIsFile: 'path/to/file',
        batchSize: 5,
        tokenId: '0.0.123',
        supplyKey: PrivateKey.generateED25519(),
      })
    ).not.toThrow();
  });

  it('should throw an error if validatePropsForUniqueNFTMinting and metadataArray is undefined', () => {
    expect(() =>
      validatePropsForUniqueNFTMinting({
        metadataArray: undefined,
        batchSize: 5,
        tokenId: '0.0.123',
        supplyKey: PrivateKey.generateED25519(),
      })
    ).toThrow(dictionary.mintToken.csvOrArrayRequired);
  });

  it('should throw an error if validatePropsForUniqueNFTMinting and metadataArray is undefined', () => {
    expect(() =>
      validatePropsForUniqueNFTMinting({
        batchSize: 5,
        tokenId: '0.0.123',
        supplyKey: PrivateKey.generateED25519(),
      })
    ).toThrow(dictionary.mintToken.csvOrArrayRequired);
  });

  it('should not throw an error if validatePropsForUniqueNFTMinting and metadataArray is provided', () => {
    expect(() =>
      validatePropsForUniqueNFTMinting({
        metadataArray: ['metadata1', 'metadata2'],
        batchSize: 5,
        tokenId: '0.0.123',
        supplyKey: PrivateKey.generateED25519(),
      })
    ).not.toThrow();
  });

  it('should not throw an error if validatePropsForUniqueNFTMinting and pathToMetadataURIsFile is provided', () => {
    expect(() =>
      validatePropsForUniqueNFTMinting({
        pathToMetadataURIsFile: 'path/to/file',
        batchSize: 5,
        tokenId: '0.0.123',
        supplyKey: PrivateKey.generateED25519(),
      })
    ).not.toThrow();
  });

  it('should throw an error if validatePropsForUniqueNFTMinting and both metadataArray and pathToMetadataURIsFile are undefined', () => {
    expect(() =>
      validatePropsForUniqueNFTMinting({
        metadataArray: undefined,
        pathToMetadataURIsFile: undefined,
        batchSize: 5,
        tokenId: '0.0.123',
        supplyKey: PrivateKey.generateED25519(),
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
      })
    ).toThrow(new Error(dictionary.createCollection.collectionSymbolRequired));
  });
});

describe('validatePropsForFixedFeeFunction', () => {
  it('should throw an error if hbarAmount, amount, and denominatingTokenId are not set', () => {
    expect(() => validatePropsForFixedFeeFunction({ collectorAccountId: '0.0.123' })).toThrow(
      dictionary.createCollection.hbarAmountOrAmountAndDenominatingToken
    );
  });

  it('should throw an error if only denominatingTokenId is set', () => {
    expect(() => validatePropsForFixedFeeFunction({ denominatingTokenId: '0.0.1', collectorAccountId: '0.0.123' })).toThrow(
      dictionary.createCollection.hbarAmountOrAmountAndDenominatingToken
    );
  });

  it('should throw an error if only amount is set', () => {
    expect(() => validatePropsForFixedFeeFunction({ amount: 1, collectorAccountId: '0.0.123' })).toThrow(
      dictionary.createCollection.hbarAmountOrAmountAndDenominatingToken
    );
  });

  it('should not throw an error if amount and denominatingTokenId are set', () => {
    expect(() =>
      validatePropsForFixedFeeFunction({ amount: 1, denominatingTokenId: '0.0.1', collectorAccountId: '0.0.123' })
    ).not.toThrow();
  });

  it('should not throw an error if only hbarAmount is set', () => {
    expect(() => validatePropsForFixedFeeFunction({ hbarAmount: 1, collectorAccountId: '0.0.123' })).not.toThrow();
  });

  it('should throw an error if hbarAmount and denominatingTokenId are set', () => {
    expect(() => validatePropsForFixedFeeFunction({ hbarAmount: 1, denominatingTokenId: '0.0.1', collectorAccountId: '0.0.123' })).toThrow(
      dictionary.createCollection.hbarAmountOrAmountAndDenominatingToken
    );
  });

  it('should throw an error if hbarAmount and amount are set', () => {
    expect(() => validatePropsForFixedFeeFunction({ hbarAmount: 1, amount: 1, collectorAccountId: '0.0.123' })).toThrow(
      dictionary.createCollection.hbarAmountOrAmountAndDenominatingToken
    );
  });

  it('should throw an error if hbarAmount, amount, and denominatingTokenId are set', () => {
    expect(() =>
      validatePropsForFixedFeeFunction({
        hbarAmount: 1,
        amount: 1,
        denominatingTokenId: '0.0.1',
        collectorAccountId: '0.0.123',
      })
    ).toThrow(dictionary.createCollection.hbarAmountOrAmountAndDenominatingToken);
  });
});
