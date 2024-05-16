"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHolderAndDuration = void 0;
var _dateFns = require("date-fns");
var _dictionary = require("../utils/constants/dictionary");
var _mirrorNode = require("../api/mirror-node");
/*-
 *
 * Hedera NFT SDK
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
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

const getHolderAndDuration = async _ref => {
  let {
    tokenId,
    serialNumber,
    network
  } = _ref;
  const nftDetailsData = await (0, _mirrorNode.getSingleNFTDetails)(network, tokenId, serialNumber);
  if (nftDetailsData.deleted) {
    throw new Error(_dictionary.dictionary.errors.nftDeleted);
  }
  const transactionsData = await (0, _mirrorNode.getLastOwnershipTransferForNft)(network, tokenId, serialNumber);
  if (!transactionsData) {
    throw new Error(_dictionary.dictionary.errors.nftNoTransactions);
  }
  const date = (0, _dateFns.fromUnixTime)(Number(transactionsData.consensus_timestamp));
  const readableDate = (0, _dateFns.formatISO)(date);
  return {
    holder: transactionsData.receiver_account_id,
    holderSince: readableDate
  };
};
exports.getHolderAndDuration = getHolderAndDuration;
//# sourceMappingURL=index.js.map