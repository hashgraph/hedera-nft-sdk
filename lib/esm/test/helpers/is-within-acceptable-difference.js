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
import { ESTIMATE_ACCEPTABLE_DIFFERENCE_PERCENT } from '../e2e/e2e-consts';
export const isWithinAcceptableDifference = (estimatedHbarsValue, transactionFeeHbars) => {
  const difference = Math.abs(transactionFeeHbars - estimatedHbarsValue);
  const acceptableDifference = Math.abs(transactionFeeHbars * ESTIMATE_ACCEPTABLE_DIFFERENCE_PERCENT);
  return difference <= acceptableDifference;
};
//# sourceMappingURL=is-within-acceptable-difference.js.map