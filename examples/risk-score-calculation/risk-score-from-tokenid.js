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
const { calculateRiskScoreFromTokenId } = require('../..');

async function main() {
  // source: https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/0.0.1270555/
  const results = await calculateRiskScoreFromTokenId({ tokenId: '0.0.1270555' });
  console.log(results);

  /* Output:
        { riskScore: 20, riskLevel: 'LOW' }
    */
}

main();
