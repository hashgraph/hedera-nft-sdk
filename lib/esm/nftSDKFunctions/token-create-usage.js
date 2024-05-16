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

import { getStringSize } from '../helpers/get-string-size';
import { DEFAULT_EXPIRATION_TIME } from '../utils/constants/fee-tool';
export const tokenCreateUsage = ({
  collectionName,
  collectionSymbol,
  keys,
  treasuryAccount
}) => {
  return {
    numSigsPayer: 1,
    numSigsTotal: treasuryAccount ? 2 : 1,
    numAdminKeys: keys?.admin ? 1 : 0,
    numKycKeys: keys?.KYC ? 1 : 0,
    numWipeKeys: keys?.wipe ? 1 : 0,
    numSupplyKeys: keys?.supply ? 1 : 0,
    numPauseKeys: keys?.pause ? 1 : 0,
    numFreezeKeys: keys?.freeze ? 1 : 0,
    expirationHours: DEFAULT_EXPIRATION_TIME,
    tokenNameSize: getStringSize(collectionName),
    tokenSymbolSize: getStringSize(collectionSymbol),
    memoSize: getStringSize(''),
    isAutoRenewAccountSet: false
  };
};
//# sourceMappingURL=token-create-usage.js.map