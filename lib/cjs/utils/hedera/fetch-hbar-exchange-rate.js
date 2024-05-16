"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchHbarExchangeRate = void 0;
var _dictionary = require("../constants/dictionary");
var _getMirrorNodeUrlForNetwork = require("./get-mirror-node-url-for-network");
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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

const fetchHbarExchangeRate = async (network, mirrorNodeUrl) => {
  try {
    const url = mirrorNodeUrl || (0, _getMirrorNodeUrlForNetwork.getMirrorNodeUrlForNetwork)(network);
    const {
      data
    } = await _axios.default.get(`${url}/network/exchangerate`);
    return data;
  } catch {
    throw new Error(_dictionary.dictionary.errors.cannotFetchHbarExchangeRate);
  }
};
exports.fetchHbarExchangeRate = fetchHbarExchangeRate;
//# sourceMappingURL=fetch-hbar-exchange-rate.js.map