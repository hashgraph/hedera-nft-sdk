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
import { HederaUsage } from '../../types/estimate-create-collection';

export const NUM_NODES = 13;
export const CONSTANT_TERM_WEIGHT = 0.2;
export const PRICE_PRECISION = 5;
export const FEE_SCHEDULE_MULTIPLIER = 1000;
export const USD_TO_TINYCENTS = 10000000000;

export const DEFAULT_EXPIRATION_TIME = 2160;

export const CONSTANTS_FOR_FORMULAE = {
  DURATION_SIZE: 8,
  TRANSFER_LIST_SIZE: 32,
  BASE_ACCOUNT_SIZE: 68,
  BASE_SCHEDULE_SIZE: 48,
  STATE_PROOF_SIZE: 2000,
  STATUS_SIZE: 8,
  EXCHANGE_RATE_SIZE: 16,
  EXCHANGE_RATE_SET_SIZE: 32,
  BALANCE_RESPONSE_SIZE: 32,
  LIVEHASH_SIZE: 72,
  VERSION_SIZE: 16,
  BASE_RECEIPT_SIZE: 36,
  BASE_RECORD_SIZE: 132,
  MICROPAYMENT_SIZE: 208,
  BASE_TX_SIZE: 76,
  BASE_CRYPTOCREATE_SIZE: 68,
  BASE_FILECREATE_SIZE: 32,
  BASE_SCHEDULECREATE_SIZE: 44,
  BASE_QUERYHEADER_SIZE: 212,
  BASE_QUERYRESPONSE_SIZE: 16,
  PROXYACCOUNT_SIZE: 32,
  BASE_TXRESPONSE_SIZE: 4,
  GASPARAM_SIZE: 8,
  BASE_CONTRACTINFO_SIZE: 100,
  BASE_FILEINFO_SIZE: 68,

  SOLIDITY_ADDRESS_SIZE: 20,
  KEY_SIZE: 32,
  TX_HASH_SIZE: 48,
  TIMESTAMP_SIZE: 8,
  ACCOUNT_ID_SIZE: 24,
  SIG_SIZE: 64,
  HASH_SIZE: 48,
  TRANSACTION_ID_SIZE: 28,
  FILE_ID_SIZE: 24,
  CONTRACT_ID_SIZE: 24,

  TOPIC_ID_SIZE: 24,
  BASE_TOPIC_SIZE: 96,
  RUNNING_HASH_SIZE: 48,
  SEQUENCE_NUMBER_SIZE: 8,
  BASIC_TOPIC_SIZE: 100,

  TOKEN_ID_SIZE: 24,
  BASE_TOKEN_SIZE: 64,
  BASE_TOKEN_ASSOCIATION_SIZE: 88,
  TOKEN_BALANCE_SIZE: 8,
  TOKEN_KYC_STATUS_SIZE: 4,
  TOKEN_FREEZE_STATUS_SIZE: 4,
  TOKEN_MULTIPLIER: 400,
  AUTO_ASSOCIATION_CREATE_MULTIPLIER: 1228,
  AUTO_ASSOCIATION_UPDATE_MULTIPLIER: 24000,

  MINUTES_3: 180,
  HOURS_1: 3600,
  HOURS_24: 86400,
  HOURS_25: 90000,

  SERIAL_NO_SIZE: 8,
  NFT_TRANSFER_SIZE: 56,
  FIXED_HBAR_FEE_SIZE: 32,
  FIXED_HTS_FEE_SIZE: 56,
  FRACTIONAL_FEE_SIZE: 56,
  ROYALTY_FEE_NO_FALLBACK_SIZE: 40,
  ROYALTY_FEE_HBAR_FALLBACK_SIZE: 48,
  ROYALTY_FEE_HTS_FALLBACK_SIZE: 72,
  BASE_NFT_REPR_SIZE: 68,

  CRYPTO_ALLOWANCE_SIZE: 36,
  TOKEN_ALLOWANCE_SIZE: 40,
  NFT_ALLOWANCE_SIZE: 36,
  SERIAL_NUM_SIZE: 8,

  CRYPTO_DELETE_ALLOWANCE_SIZE: 24,
  TOKEN_DELETE_ALLOWANCE_SIZE: 48,
  NFT_DELETE_ALLOWANCE_SIZE: 48,

  AUTO_ASSOCIATION_SIZE: 4,
  TOKEN_ASSOCIATION_REPR: 20,
  BASE_CONTRACT_SIZE: 128,
  KV_PAIR_SIZE: 64,
  NUM_IMPLICIT_ETH_SIGS: 1,

  PRNG_RANGE_SIZE: 4,
  PSEUDORANDOM_NUMBER_SIZE: 4,
  PSEUDORANDOM_BYTES_SIZE: 48,

  FREE_TIER_LIMIT: 100000000,
  FIRST_TIER_PRICE: 200000,
  REFERENCE_SLOT_LIFETIME: 8760,
};

export const INITIAL_HEDERA_USAGE: HederaUsage = {
  node: { constant: 1, bpt: 0, vpt: 0, rbh: 0, sbh: 0, gas: 0, bpr: 0, sbpr: 0, min: 0, max: 0 },
  network: { constant: 1, bpt: 0, vpt: 0, rbh: 0, sbh: 0, gas: 0, bpr: 0, sbpr: 0, min: 0, max: 0 },
  service: { constant: 1, bpt: 0, vpt: 0, rbh: 0, sbh: 0, gas: 0, bpr: 0, sbpr: 0, min: 0, max: 0 },
};

export const FEE_SCHEDULES = {
  CREATE_TOKEN_NON_FUNGIBLE_UNIQUE: {
    node: {
      constant: 213031853851,
      bpt: 8749858,
      vpt: 21874645140,
      rbh: 5833,
      sbh: 437,
      gas: 58332,
      bpr: 8749858,
      sbpr: 218746,
      min: 0,
      max: 1000000000000000,
    },
    network: {
      constant: 3940637077020,
      bpt: 174997161,
      vpt: 437492902800,
      rbh: 116665,
      sbh: 8750,
      gas: 1166648,
      bpr: 174997161,
      sbpr: 4374929,
      min: 0,
      max: 1000000000000000,
    },
    service: {
      constant: 3940637077020,
      bpt: 174997161,
      vpt: 437492902800,
      rbh: 116665,
      sbh: 8750,
      gas: 1166648,
      bpr: 174997161,
      sbpr: 4374929,
      min: 0,
      max: 1000000000000000,
    },
  },

  CREATE_TOKEN_NON_FUNGIBLE_UNIQUE_WITH_CUSTOM_FEES: {
    node: {
      constant: 452198370765,
      bpt: 17461288,
      vpt: 43653219832,
      rbh: 11641,
      sbh: 873,
      gas: 116409,
      bpr: 17461288,
      sbpr: 436532,
      min: 0,
      max: 1000000000000000,
    },
    network: {
      constant: 7863967415309,
      bpt: 349225759,
      vpt: 873064396645,
      rbh: 232817,
      sbh: 17461,
      gas: 2328172,
      bpr: 349225759,
      sbpr: 8730644,
      min: 0,
      max: 1000000000000000,
    },
    service: {
      constant: 7863967415309,
      bpt: 349225759,
      vpt: 873064396645,
      rbh: 232817,
      sbh: 17461,
      gas: 2328172,
      bpr: 349225759,
      sbpr: 8730644,
      min: 0,
      max: 1000000000000000,
    },
  },
};
