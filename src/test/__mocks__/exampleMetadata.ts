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
export const exampleMetadata = {
  data: {
    admin_key: null,
    auto_renew_account: '0.0.869800',
    auto_renew_period: 7776000,
    created_timestamp: '1650873527.188146000',
    custom_fees: {
      created_timestamp: '1650873527.188146000',
      fixed_fees: [],
      royalty_fees: [
        {
          all_collectors_are_exempt: false,
          amount: {
            denominator: 10000,
            numerator: 100,
          },
          collector_account_id: '0.0.701607',
          fallback_fee: null,
        },
        {
          all_collectors_are_exempt: false,
          amount: {
            denominator: 10000,
            numerator: 100,
          },
          collector_account_id: '0.0.702648',
          fallback_fee: null,
        },
        {
          all_collectors_are_exempt: false,
          amount: {
            denominator: 10000,
            numerator: 100,
          },
          collector_account_id: '0.0.703302',
          fallback_fee: null,
        },
        {
          all_collectors_are_exempt: false,
          amount: {
            denominator: 10000,
            numerator: 100,
          },
          collector_account_id: '0.0.701676',
          fallback_fee: null,
        },
        {
          all_collectors_are_exempt: false,
          amount: {
            denominator: 10000,
            numerator: 100,
          },
          collector_account_id: '0.0.869430',
          fallback_fee: null,
        },
      ],
    },
    decimals: '0',
    deleted: false,
    expiry_timestamp: 1658649527188146000,
    fee_schedule_key: null,
    freeze_default: false,
    freeze_key: null,
    initial_supply: '0',
    kyc_key: null,
    max_supply: '10000',
    memo: '',
    modified_timestamp: '1678995603.647809003',
    name: 'Dead Pixels Ghost Club',
    pause_key: null,
    pause_status: 'NOT_APPLICABLE',
    supply_key: {
      _type: 'ED25519',
      key: 'ef6de857cb895b26045aeb625543db146a68cf49565784a3333057c55e321313',
    },
    supply_type: 'FINITE',
    symbol: 'DPGC',
    token_id: '0.0.878200',
    total_supply: '3900',
    treasury_account_id: '0.0.869800',
    type: 'NON_FUNGIBLE_UNIQUE',
    wipe_key: null,
  },
};

export const metadataWihAllKeysProvided = {
  data: {
    admin_key: {
      _type: 'ED25519',
      key: '49efa5f54192470706914df50f17472f6f2310b8476293822e0d49b313ca2875',
    },
    auto_renew_account: '0.0.869800',
    auto_renew_period: 7776000,
    created_timestamp: '1650873527.188146000',
    custom_fees: {
      created_timestamp: '1650873527.188146000',
      fixed_fees: [],
      royalty_fees: [
        {
          all_collectors_are_exempt: false,
          amount: {
            denominator: 10000,
            numerator: 100,
          },
          collector_account_id: '0.0.701607',
          fallback_fee: null,
        },
        {
          all_collectors_are_exempt: false,
          amount: {
            denominator: 10000,
            numerator: 100,
          },
          collector_account_id: '0.0.702648',
          fallback_fee: null,
        },
        {
          all_collectors_are_exempt: false,
          amount: {
            denominator: 10000,
            numerator: 100,
          },
          collector_account_id: '0.0.703302',
          fallback_fee: null,
        },
        {
          all_collectors_are_exempt: false,
          amount: {
            denominator: 10000,
            numerator: 100,
          },
          collector_account_id: '0.0.701676',
          fallback_fee: null,
        },
        {
          all_collectors_are_exempt: false,
          amount: {
            denominator: 10000,
            numerator: 100,
          },
          collector_account_id: '0.0.869430',
          fallback_fee: null,
        },
      ],
    },
    decimals: '0',
    deleted: false,
    expiry_timestamp: 1658649527188146000,
    fee_schedule_key: {
      _type: 'ED25519',
      key: '49efa5f54192470706914df50f17472f6f2310b8476293822e0d49b313ca2875',
    },
    freeze_default: false,
    freeze_key: {
      _type: 'ED25519',
      key: '49efa5f54192470706914df50f17472f6f2310b8476293822e0d49b313ca2875',
    },
    initial_supply: '0',
    kyc_key: {
      _type: 'ED25519',
      key: '49efa5f54192470706914df50f17472f6f2310b8476293822e0d49b313ca2875',
    },
    max_supply: '10000',
    memo: '',
    modified_timestamp: '1678995603.647809003',
    name: 'Dead Pixels Ghost Club',
    pause_key: {
      _type: 'ED25519',
      key: '49efa5f54192470706914df50f17472f6f2310b8476293822e0d49b313ca2875',
    },
    pause_status: 'NOT_APPLICABLE',
    supply_key: {
      _type: 'ED25519',
      key: 'ef6de857cb895b26045aeb625543db146a68cf49565784a3333057c55e321313',
    },
    supply_type: 'FINITE',
    symbol: 'DPGC',
    token_id: '0.0.878200',
    total_supply: '3900',
    treasury_account_id: '0.0.869800',
    type: 'NON_FUNGIBLE_UNIQUE',
    wipe_key: {
      _type: 'ED25519',
      key: '49efa5f54192470706914df50f17472f6f2310b8476293822e0d49b313ca2875',
    },
  },
};
