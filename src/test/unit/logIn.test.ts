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
import { logIn } from '../../nftSDKFunctions/log-in';
import { AccountId, Client } from '@hashgraph/sdk';
import { myAccountId, myPrivateKey } from '../__mocks__/consts';
import { dictionary } from '../../utils/constants/dictionary';

jest.mock('@hashgraph/sdk', () => {
  return {
    Client: {
      forName: jest.fn().mockReturnThis(),
      forLocalNode: jest.fn().mockReturnThis(),
      forNetwork: jest.fn().mockReturnThis(),
      setMirrorNetwork: jest.fn().mockReturnThis(),
      setOperator: jest.fn(),
    },
    AccountId: jest.fn().mockReturnThis()
  };
});

describe('logIn', () => {
  it('should call setOperator with correct parameters', () => {
    logIn({ myAccountId, myPrivateKey, network: 'testnet' });

    expect(Client.forName).toHaveBeenCalled();
    expect(Client.forName('testnet').setOperator).toHaveBeenCalledWith(myAccountId, myPrivateKey);
  });

  it('should throw an error if myAccountId is not provided', () => {
    expect(() => logIn({ myAccountId: '', myPrivateKey, network: 'testnet' })).toThrow(dictionary.createCollection.myAccountIdRequired);
  });

  it('should throw an error if myPrivateKey is not provided', () => {
    expect(() => logIn({ myAccountId, myPrivateKey: '', network: 'testnet' })).toThrow(dictionary.createCollection.myPrivateKeyRequired);
  });

  it('should create a client for local netowrk', () => {
    logIn({ myAccountId, myPrivateKey, network: 'localnode' });

    expect(Client.forLocalNode).toHaveBeenCalled();
    expect(Client.forLocalNode().setOperator).toHaveBeenCalledWith(myAccountId, myPrivateKey);
  });

  it('should create a client for local network with custom node', () => {
    const localNode = {'127.0.0.1:50211': new AccountId(3)};
    logIn({ myAccountId, myPrivateKey, network: 'localnode', localNode: localNode });

    expect(Client.forNetwork).toHaveBeenCalled();
    expect(Client.forNetwork(localNode).setOperator).toHaveBeenCalledWith(myAccountId, myPrivateKey);
  });

  it('should create a client for local network with custom node and mirror network', () => {
    const localNode = {'127.0.0.1:50211': new AccountId(3)};
    const mirrorNetwork = 'mirrorNetwork';
    logIn({ myAccountId, myPrivateKey, network: 'localnode', localNode: localNode, localMirrorNode: mirrorNetwork });

    expect(Client.forNetwork).toHaveBeenCalled();
    expect(Client.forNetwork(localNode).setMirrorNetwork).toHaveBeenCalledWith(mirrorNetwork);
    expect(Client.forNetwork(localNode).setOperator).toHaveBeenCalledWith(myAccountId, myPrivateKey);
  });
});
