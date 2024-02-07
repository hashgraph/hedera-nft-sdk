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
import { Client, PrivateKey } from '@hashgraph/sdk';
import { createCollectionFunction } from '../../functions/create-collection';
import { myPrivateKey } from '../__mocks__/consts';
import { dictionary } from '../../utils/constants/dictionary';

jest.mock('@hashgraph/sdk', () => {
  return {
    Client: {
      forTestnet: jest.fn().mockImplementation(() => ({
        setOperator: jest.fn(),
        getOperator: jest.fn().mockResolvedValue({
          accountId: {
            toString: jest.fn().mockReturnValue('1.2.1234'),
          },
        }),
        _maxExecutionTime: jest.fn(),
        setMaxExecutionTime: jest.fn(),
        _setNetworkFromName: jest.fn(),
        setMirrorNetwork: jest.fn(),
      })),
    },
    AccountId: {
      fromString: jest.fn().mockReturnThis(),
    },
    PrivateKey: {
      fromString: jest.fn().mockReturnThis(),
      generateED25519: jest.fn().mockReturnThis(),
    },
    TokenCreateTransaction: jest.fn(() => ({
      setTokenName: jest.fn().mockReturnThis(),
      setTokenSymbol: jest.fn().mockReturnThis(),
      setTokenType: jest.fn().mockReturnThis(),
      setSupplyType: jest.fn().mockReturnThis(),
      setSupplyKey: jest.fn().mockReturnThis(),
      setTreasuryAccountId: jest.fn().mockReturnThis(),
      setAdminKey: jest.fn().mockReturnThis(),
      setKycKey: jest.fn().mockReturnThis(),
      setFreezeKey: jest.fn().mockReturnThis(),
      setWipeKey: jest.fn().mockReturnThis(),
      setFeeScheduleKey: jest.fn().mockReturnThis(),
      setPauseKey: jest.fn().mockReturnThis(),
      setMaxSupply: jest.fn().mockReturnThis(),
      setCustomFees: jest.fn().mockReturnThis(),
      freezeWith: jest.fn().mockReturnThis(),
      sign: jest.fn().mockResolvedValue({
        execute: jest.fn().mockResolvedValue({
          getReceipt: jest.fn().mockResolvedValue({
            tokenId: {
              toString: jest.fn().mockReturnValue('1.2.1234'),
            },
          }),
        }),
      }),
    })),
    TokenType: {
      NonFungibleUnique: 'NonFungibleUnique',
    },
  };
});

describe('createCollectionFunction', () => {
  it('should create a collection and return a tokenId', async () => {
    const client = Client.forTestnet();
    const collectionName = 'test';
    const collectionSymbol = 'test2';

    const tokenId = await createCollectionFunction({
      client,
      myPrivateKey,
      collectionName,
      collectionSymbol,
    });

    expect(tokenId).toEqual('1.2.1234');
  });

  it('should throw an error when only treasuryAccount is passed', async () => {
    const client = Client.forTestnet();
    const collectionName = 'test';
    const collectionSymbol = 'test2';

    await expect(
      createCollectionFunction({
        client,
        myPrivateKey,
        collectionName,
        collectionSymbol,
        treasuryAccount: '0.0.4321',
      })
    ).rejects.toThrow(dictionary.hederaActions.treasuryAccountPrivateKeySignRequired);
  });

  it('should throw an error when only treasuryAccountPrivateKey is passed', async () => {
    const client = Client.forTestnet();
    const collectionName = 'test';
    const collectionSymbol = 'test2';

    await expect(
      createCollectionFunction({
        client,
        myPrivateKey,
        collectionName,
        collectionSymbol,
        treasuryAccountPrivateKey: '0.0.4321',
      })
    ).rejects.toThrow(dictionary.hederaActions.treasuryAccountPrivateKeySignRequired);
  });

  it('should create collection when treasuryAccount and treasuryAccountPrivateKey are passed', async () => {
    const client = Client.forTestnet();
    const collectionName = 'test';
    const collectionSymbol = 'test2';

    const tokenId = await createCollectionFunction({
      client,
      myPrivateKey,
      collectionName,
      collectionSymbol,
    });

    expect(tokenId).toEqual('1.2.1234');
  });

  it('should throw an error if collectionName is not provided', async () => {
    const client = Client.forTestnet();
    const collectionSymbol = 'test2';
    const keys = {
      admin: PrivateKey.fromString(myPrivateKey),
      supply: PrivateKey.fromString(myPrivateKey),
    };
    const treasuryAccount = '0.0.4321';
    const treasuryAccountPrivateKey = '0.0.4321';

    await expect(
      createCollectionFunction({
        client,
        myPrivateKey,
        collectionName: '',
        collectionSymbol,
        keys,
        treasuryAccount,
        treasuryAccountPrivateKey,
      })
    ).rejects.toThrow(dictionary.hederaActions.collectionNameRequired);
  });

  it('should throw an error if collectionSymbol is not provided', async () => {
    const client = Client.forTestnet();
    const keys = {
      admin: PrivateKey.fromString(myPrivateKey),
      supply: PrivateKey.fromString(myPrivateKey),
    };
    const treasuryAccount = '0.0.4321';
    const treasuryAccountPrivateKey = '0.0.4321';

    await expect(
      createCollectionFunction({
        client,
        myPrivateKey,
        collectionName: 'abc',
        collectionSymbol: '',
        keys,
        treasuryAccount,
        treasuryAccountPrivateKey,
      })
    ).rejects.toThrow(dictionary.hederaActions.collectionSymbolRequired);
  });

  it('should create a collection with keys', async () => {
    const client = Client.forTestnet();
    const collectionName = 'test';
    const collectionSymbol = 'test2';
    const keys = {
      admin: PrivateKey.generateED25519(),
      supply: PrivateKey.fromString(myPrivateKey),
    };

    const tokenId = await createCollectionFunction({
      client,
      myPrivateKey,
      collectionName,
      collectionSymbol,
      keys,
    });

    expect(tokenId).toEqual('1.2.1234');
  });
});
