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
import { FeeToolConfig } from '../../types/estimate-create-collection';
import { FEE_SCHEDULES } from './fee-tool';

export const CREATE_TOKEN_NON_FUNGIBLE_UNIQUE: FeeToolConfig = {
  formulae: {
    node: {
      bpt: 'BASE_TX_SIZE + BASE_TOKEN_SIZE + (numFreezeKeys * KEY_SIZE) + (numPauseKeys * KEY_SIZE) + (numSupplyKeys * KEY_SIZE) + (numWipeKeys * KEY_SIZE) + (numKycKeys * KEY_SIZE) + (numAdminKeys * KEY_SIZE) + (numSigsTotal * SIG_SIZE) + memoSize + tokenNameSize + tokenSymbolSize + (isAutoRenewAccountSet * ACCOUNT_ID_SIZE)',
      vpt: 'numSigsPayer',
      bpr: 'BASE_TXRESPONSE_SIZE',
    },
    network: {
      bpt: 'BASE_TX_SIZE + BASE_TOKEN_SIZE + (numFreezeKeys * KEY_SIZE) + (numPauseKeys * KEY_SIZE) + (numSupplyKeys * KEY_SIZE) + (numWipeKeys * KEY_SIZE) + (numKycKeys * KEY_SIZE) + (numAdminKeys * KEY_SIZE) + (numSigsTotal * SIG_SIZE) + memoSize + tokenNameSize + tokenSymbolSize + (isAutoRenewAccountSet * ACCOUNT_ID_SIZE)',
      vpt: 'numSigsTotal',
      rbh: '(BASE_RECEIPT_SIZE + TOKEN_ID_SIZE) * MINUTES_3 / HOURS_1',
    },
    service: {
      rbh: '((BASE_TOKEN_SIZE + tokenNameSize + tokenSymbolSize + (numAdminKeys * KEY_SIZE) + (numKycKeys * KEY_SIZE) + (numWipeKeys * KEY_SIZE) + (numPauseKeys * KEY_SIZE) + (numSupplyKeys * KEY_SIZE) + (numFreezeKeys * KEY_SIZE) + (isAutoRenewAccountSet * ACCOUNT_ID_SIZE)) * expirationHours)',
    },
  },
  feeSchedules: FEE_SCHEDULES.CREATE_TOKEN_NON_FUNGIBLE_UNIQUE,
};

export const CREATE_TOKEN_NON_FUNGIBLE_UNIQUE_WITH_CUSTOM_FEES: FeeToolConfig = {
  formulae: {
    node: {
      bpt: 'BASE_TX_SIZE + BASE_TOKEN_SIZE + (numFreezeKeys * KEY_SIZE) + (numSupplyKeys * KEY_SIZE) + (numWipeKeys * KEY_SIZE) + (numKycKeys * KEY_SIZE) + (numAdminKeys * KEY_SIZE) + (numSigsTotal * SIG_SIZE) + memoSize + tokenNameSize + tokenSymbolSize + (isAutoRenewAccountSet * ACCOUNT_ID_SIZE)',
      vpt: 'numSigsPayer',
      bpr: 'BASE_TXRESPONSE_SIZE',
    },
    network: {
      bpt: 'BASE_TX_SIZE + BASE_TOKEN_SIZE + (numFreezeKeys * KEY_SIZE) + (numPauseKeys * KEY_SIZE) + (numSupplyKeys * KEY_SIZE) + (numWipeKeys * KEY_SIZE) + (numKycKeys * KEY_SIZE) + (numAdminKeys * KEY_SIZE) + (numSigsTotal * SIG_SIZE) + memoSize + tokenNameSize + tokenSymbolSize + (isAutoRenewAccountSet * ACCOUNT_ID_SIZE)',
      vpt: 'numSigsTotal',
      rbh: '(BASE_RECEIPT_SIZE + TOKEN_ID_SIZE) * MINUTES_3 / HOURS_1',
    },
    service: {
      rbh: '((BASE_TOKEN_SIZE + tokenNameSize + tokenSymbolSize + (numAdminKeys * KEY_SIZE) + (numKycKeys * KEY_SIZE) + (numWipeKeys * KEY_SIZE) + (numPauseKeys * KEY_SIZE) + (numSupplyKeys * KEY_SIZE) + (numFreezeKeys * KEY_SIZE) + (isAutoRenewAccountSet * ACCOUNT_ID_SIZE) + (numFixedHbarCustomFees * FIXED_HBAR_FEE_SIZE) + (numFixedHtsCustomFees * FIXED_HTS_FEE_SIZE) + (numRoyaltyNoFallbackCustomFees * ROYALTY_FEE_NO_FALLBACK_SIZE) + (numRoyaltyHbarFallbackCustomFees * ROYALTY_FEE_HBAR_FALLBACK_SIZE) + (numRoyaltyHtsFallbackCustomFees * ROYALTY_FEE_HTS_FALLBACK_SIZE)) * expirationHours)',
    },
  },
  feeSchedules: FEE_SCHEDULES.CREATE_TOKEN_NON_FUNGIBLE_UNIQUE_WITH_CUSTOM_FEES,
};
