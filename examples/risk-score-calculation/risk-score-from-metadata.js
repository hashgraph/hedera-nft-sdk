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
const { calculateRiskScoreFromData } = require('../..');

function main() {
  // source: https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/0.0.1270555/
  const tokenInformation = {
    admin_key: null,
    auto_renew_account: '0.0.784037',
    auto_renew_period: 7776000,
    created_timestamp: '1663272359.743907659',
    custom_fees: {
      created_timestamp: '1663272359.743907659',
      fixed_fees: [],
      royalty_fees: [{ all_collectors_are_exempt: false, amount: { numerator: 5, denominator: 100 }, collector_account_id: '0.0.607666' }],
    },
    decimals: '0',
    deleted: false,
    expiry_timestamp: 1671048359743907659,
    fee_schedule_key: null,
    metadata_key: null,
    freeze_default: false,
    freeze_key: null,
    initial_supply: '0',
    kyc_key: null,
    max_supply: '2331',
    memo: '',
    modified_timestamp: '1663276335.852057651',
    name: 'Hash Crabs Gen 2.0',
    pause_key: null,
    pause_status: 'NOT_APPLICABLE',
    supply_key: {
      _type: 'ED25519',
      key: '49efa5f54192470706914df50f17472f6f2310b8476293822e0d49b313ca2875',
    },
    supply_type: 'FINITE',
    symbol: 'HASH CRABS GEN 2.0',
    token_id: '0.0.1270555',
    total_supply: '777',
    treasury_account_id: '0.0.784037',
    type: 'NON_FUNGIBLE_UNIQUE',
    wipe_key: null,
  };

  const results = calculateRiskScoreFromData({ metadata: tokenInformation });
  console.log(results);

  /* Output:
        { riskScore: 20, riskLevel: 'LOW' }
    */
}

main();
