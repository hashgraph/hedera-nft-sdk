"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mintToken = mintToken;
var _sdk = require("@hashgraph/sdk");
var _const = require("../utils/const");
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

async function mintToken(metaData, tokenId, supplyKey, client) {
  const CIDs = metaData.map(metaData => Buffer.from(metaData));
  if (CIDs.some(cid => cid.toString().length > 100)) {
    throw new Error(_dictionary.dictionary.mintToken.tooLongCID);
  }
  const transaction = new _sdk.TokenMintTransaction().setTokenId(tokenId).setMaxTransactionFee(new _sdk.Hbar(_const.mintingMaxTransactionFee)).setMetadata(CIDs).freezeWith(client);
  const signTx = await transaction.sign(supplyKey);
  const txResponse = await signTx.execute(client);
  return txResponse.getReceipt(client);
}
//# sourceMappingURL=mint-token.js.map