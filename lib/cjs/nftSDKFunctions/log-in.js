"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logIn = void 0;
var _sdk = require("@hashgraph/sdk");
var _dictionary = require("../utils/constants/dictionary");
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

const logIn = _ref => {
  let {
    myAccountId,
    myPrivateKey,
    network,
    localNode,
    localMirrorNode
  } = _ref;
  if (!myAccountId) throw new Error(_dictionary.dictionary.createCollection.myAccountIdRequired);
  if (!myPrivateKey) throw new Error(_dictionary.dictionary.createCollection.myPrivateKeyRequired);
  if (network == 'localnode') {
    return handleLocalNode({
      myAccountId,
      myPrivateKey,
      network,
      localNode,
      localMirrorNode
    });
  } else {
    return _sdk.Client.forName(network).setOperator(myAccountId, myPrivateKey);
  }
};
exports.logIn = logIn;
const handleLocalNode = config => {
  const client = config.localNode ? _sdk.Client.forNetwork(config.localNode) : _sdk.Client.forLocalNode();
  if (config.localMirrorNode) {
    client.setMirrorNetwork(config.localMirrorNode);
  }
  client.setOperator(config.myAccountId, config.myPrivateKey);
  return client;
};
//# sourceMappingURL=log-in.js.map