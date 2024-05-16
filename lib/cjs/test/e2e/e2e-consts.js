"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secondPrivateKey = exports.secondAccountId = exports.pinataSecretApiKey = exports.pinataJwtKey = exports.pinataApiKey = exports.operatorPrivateKey = exports.operatorAccountId = exports.nftStorageApiKey = exports.nftSDK = exports.feeFactoryInstance = exports.awsSecretKey = exports.awsAccessKey = exports.NETWORK = exports.METADATA_TO_VALIDATE_OBJECT_SERIAL = exports.LINK_TO_JSON_OBJECT_WITH_MISSING_FIELDS = exports.LINK_TO_JSON_OBJECT_WITHOUT_ERRORS = exports.IPFS_GATEWAY = exports.ESTIMATE_ACCEPTABLE_DIFFERENCE_PERCENT = exports.BATCH_SIZE_SINGLE = exports.BATCH_SIZE = exports.AMOUNT_OF_NFTS_TO_MINT_SINGLE = exports.AMOUNT_OF_NFTS_TO_MINT = void 0;
require("dotenv/config");
var _feeFactory = require("../../feeFactory");
var _nftSDKFunctions = require("../../nftSDKFunctions");
var _sdk = require("@hashgraph/sdk");
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

const operatorAccountId = exports.operatorAccountId = process.env.FIRST_ACCOUNT_ID;
const operatorPrivateKey = exports.operatorPrivateKey = _sdk.PrivateKey.fromStringDer(process.env.FIRST_PRIVATE_KEY);
const secondAccountId = exports.secondAccountId = process.env.SECOND_ACCOUNT_ID;
const secondPrivateKey = exports.secondPrivateKey = _sdk.PrivateKey.fromStringDer(process.env.SECOND_PRIVATE_KEY);
const nftStorageApiKey = exports.nftStorageApiKey = process.env.NFTSTORAGE_API_KEY;
const pinataApiKey = exports.pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = exports.pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;
const pinataJwtKey = exports.pinataJwtKey = process.env.PINATA_JWT_KEY;
const awsAccessKey = exports.awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = exports.awsSecretKey = process.env.AWS_SECRET_KEY;
const nftSDK = exports.nftSDK = new _nftSDKFunctions.HederaNFTSDK(operatorAccountId, operatorPrivateKey, 'testnet');
const feeFactoryInstance = exports.feeFactoryInstance = new _feeFactory.FeeFactory();
const NETWORK = exports.NETWORK = 'testnet';
const IPFS_GATEWAY = exports.IPFS_GATEWAY = 'https://cloudflare-ipfs.com/ipfs/';
const LINK_TO_JSON_OBJECT_WITHOUT_ERRORS = exports.LINK_TO_JSON_OBJECT_WITHOUT_ERRORS = 'https://violet-written-whale-308.mypinata.cloud/ipfs/QmVbS1sbVWKe13RYUiwPkzG5cCESM2NHTx3CuhssYUvcRn';
const LINK_TO_JSON_OBJECT_WITH_MISSING_FIELDS = exports.LINK_TO_JSON_OBJECT_WITH_MISSING_FIELDS = 'https://violet-written-whale-308.mypinata.cloud/ipfs/QmWC8VUgSkPM62mBznXqwqSvsCMSad1bxDzzqcwwYWueuf';
const AMOUNT_OF_NFTS_TO_MINT = exports.AMOUNT_OF_NFTS_TO_MINT = 35;
const AMOUNT_OF_NFTS_TO_MINT_SINGLE = exports.AMOUNT_OF_NFTS_TO_MINT_SINGLE = 3;
const BATCH_SIZE = exports.BATCH_SIZE = 5;
const BATCH_SIZE_SINGLE = exports.BATCH_SIZE_SINGLE = 1;
const METADATA_TO_VALIDATE_OBJECT_SERIAL = exports.METADATA_TO_VALIDATE_OBJECT_SERIAL = 1;
const ESTIMATE_ACCEPTABLE_DIFFERENCE_PERCENT = exports.ESTIMATE_ACCEPTABLE_DIFFERENCE_PERCENT = 0.01;
//# sourceMappingURL=e2e-consts.js.map