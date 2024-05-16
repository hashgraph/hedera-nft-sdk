"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMetaDataFromMirrorNode = exports.getLastOwnershipTransferForNft = void 0;
exports.getMetadataObjectsForValidation = getMetadataObjectsForValidation;
exports.getNFTsFromToken = getNFTsFromToken;
exports.getSingleNFTDetails = getSingleNFTDetails;
var _axios = _interopRequireDefault(require("axios"));
var _dictionary = require("../utils/constants/dictionary");
var _errorToMessage = require("../helpers/error-to-message");
var _getMirrorNodeUrlForNetwork = require("../utils/hedera/get-mirror-node-url-for-network");
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

const getMetaDataFromMirrorNode = async (network, nftId, mirrorNodeUrl) => {
  const url = mirrorNodeUrl || (0, _getMirrorNodeUrlForNetwork.getMirrorNodeUrlForNetwork)(network);
  const response = await _axios.default.get(`${url}/tokens/${nftId.tokenId.toString()}/nfts/${nftId.serial.toString()}`);
  return atob(response.data.metadata);
};
exports.getMetaDataFromMirrorNode = getMetaDataFromMirrorNode;
const getLastOwnershipTransferForNft = async (network, tokenId, serialNumber, mirrorNodeUrl) => {
  const baseUrl = mirrorNodeUrl || (0, _getMirrorNodeUrlForNetwork.getMirrorNodeUrlForNetwork)(network);
  let nextLink = `${baseUrl}/tokens/${tokenId}/nfts/${serialNumber}/transactions`;
  let requiredTransaction;
  do {
    try {
      const response = await _axios.default.get(nextLink);
      // We take the first 'CRYPTOTRANSFER' or 'TOKENMINT' transaction because these transactions represent the change of ownership of an NFT.
      // 'CRYPTOTRANSFER' indicates that the NFT was transferred from one account to another, while 'TOKENMINT' indicates that a new NFT was minted.
      // By taking the first of these transactions, we can determine the last owner of the NFT and the time when they became the owner
      requiredTransaction = response.data.transactions.find(transaction => transaction.type === 'CRYPTOTRANSFER' || transaction.type === 'TOKENMINT');
      if (requiredTransaction) break;
      nextLink = response.data.links.next ? new URL(response.data.links.next, baseUrl).href : '';
    } catch (error) {
      throw new Error((0, _errorToMessage.errorToMessage)(error));
    }
  } while (nextLink);
  return requiredTransaction;
};
exports.getLastOwnershipTransferForNft = getLastOwnershipTransferForNft;
async function getNFTsFromToken(network, tokenId) {
  let limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  const baseUrl = (0, _getMirrorNodeUrlForNetwork.getMirrorNodeUrlForNetwork)(network);
  let nextLink = `${baseUrl}/tokens/${tokenId}/nfts?limit=${limit}`;
  const allNFTs = [];
  do {
    try {
      const response = await _axios.default.get(nextLink);
      allNFTs.push(...response.data.nfts);
      nextLink = response.data.links.next ? new URL(response.data.links.next, baseUrl).href : '';
    } catch (error) {
      throw new Error((0, _errorToMessage.errorToMessage)(error));
    }
  } while (nextLink);
  return allNFTs;
}
async function getSingleNFTDetails(network, tokenId, serialNumber) {
  const baseUrl = (0, _getMirrorNodeUrlForNetwork.getMirrorNodeUrlForNetwork)(network);
  const nftURL = `${baseUrl}/tokens/${tokenId}/nfts/${serialNumber}`;
  try {
    const {
      data
    } = await _axios.default.get(nftURL);
    return data;
  } catch (error) {
    throw new Error(`${_dictionary.dictionary.errors.unknownErrorWhileFetching(serialNumber)},
    ${(0, _errorToMessage.errorToMessage)(error)}`);
  }
}
async function getMetadataObjectsForValidation(url, serialNumber) {
  try {
    const response = await _axios.default.get(url);
    return {
      isSuccessful: true,
      metadata: response.data,
      serialNumber
    };
  } catch (error) {
    let errorMessage = _dictionary.dictionary.errors.ipfsFailedToFetch;
    if (_axios.default.isAxiosError(error)) {
      if (error.response?.status === 429) {
        errorMessage = _dictionary.dictionary.errors.tooManyRequests(error.response.statusText, error.response.status);
      } else {
        errorMessage = _dictionary.dictionary.errors.unknownErrorWhileFetching(serialNumber);
      }
    }
    return {
      isSuccessful: false,
      serialNumber,
      error: errorMessage
    };
  }
}
//# sourceMappingURL=mirror-node.js.map