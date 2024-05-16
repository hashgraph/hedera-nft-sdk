"use strict";

var _logIn = require("../../nftSDKFunctions/log-in");
var _sdk = require("@hashgraph/sdk");
var _consts = require("../__mocks__/consts");
var _dictionary = require("../../utils/constants/dictionary");
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

jest.mock('@hashgraph/sdk', () => {
  const mockedSDK = jest.requireActual('@hashgraph/sdk');
  return {
    Client: {
      forName: jest.fn().mockReturnThis(),
      forLocalNode: jest.fn().mockReturnThis(),
      forNetwork: jest.fn().mockReturnThis(),
      setMirrorNetwork: jest.fn().mockReturnThis(),
      setOperator: jest.fn()
    },
    AccountId: jest.fn().mockReturnThis(),
    PrivateKey: {
      ...mockedSDK.PrivateKey,
      generateED25519: jest.fn(() => ({
        toString: () => 'fake-private-key'
      }))
    }
  };
});
describe('logIn', () => {
  it('should call setOperator with correct parameters', () => {
    (0, _logIn.logIn)({
      myAccountId: _consts.myAccountId,
      myPrivateKey: _consts.myPrivateKey,
      network: 'testnet'
    });
    expect(_sdk.Client.forName).toHaveBeenCalled();
    expect(_sdk.Client.forName('testnet').setOperator).toHaveBeenCalledWith(_consts.myAccountId, _consts.myPrivateKey);
  });
  it('should throw an error if myAccountId is not provided', () => {
    expect(() => (0, _logIn.logIn)({
      myAccountId: '',
      myPrivateKey: _consts.myPrivateKey,
      network: 'testnet'
    })).toThrow(_dictionary.dictionary.createCollection.myAccountIdRequired);
  });
  it('should create a client for local network', () => {
    (0, _logIn.logIn)({
      myAccountId: _consts.myAccountId,
      myPrivateKey: _consts.myPrivateKey,
      network: 'localnode'
    });
    expect(_sdk.Client.forLocalNode).toHaveBeenCalled();
    expect(_sdk.Client.forLocalNode().setOperator).toHaveBeenCalledWith(_consts.myAccountId, _consts.myPrivateKey);
  });
  it('should create a client for local network with custom node', () => {
    const localNode = {
      '127.0.0.1:50211': new _sdk.AccountId(3)
    };
    (0, _logIn.logIn)({
      myAccountId: _consts.myAccountId,
      myPrivateKey: _consts.myPrivateKey,
      network: 'localnode',
      localNode: localNode
    });
    expect(_sdk.Client.forNetwork).toHaveBeenCalled();
    expect(_sdk.Client.forNetwork(localNode).setOperator).toHaveBeenCalledWith(_consts.myAccountId, _consts.myPrivateKey);
  });
  it('should create a client for local network with custom node and mirror network', () => {
    const localNode = {
      '127.0.0.1:50211': new _sdk.AccountId(3)
    };
    const mirrorNetwork = 'mirrorNetwork';
    (0, _logIn.logIn)({
      myAccountId: _consts.myAccountId,
      myPrivateKey: _consts.myPrivateKey,
      network: 'localnode',
      localNode: localNode,
      localMirrorNode: mirrorNetwork
    });
    expect(_sdk.Client.forNetwork).toHaveBeenCalled();
    expect(_sdk.Client.forNetwork(localNode).setMirrorNetwork).toHaveBeenCalledWith(mirrorNetwork);
    expect(_sdk.Client.forNetwork(localNode).setOperator).toHaveBeenCalledWith(_consts.myAccountId, _consts.myPrivateKey);
  });
});
//# sourceMappingURL=logIn.test.js.map