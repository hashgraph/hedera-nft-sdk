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

import { AVERAGE_COST_OF_MINT_1_AVERAGE_METADATA_JSON } from '../utils/constants/minting';

export const estimateNftMintingInDollars = async ({ amountOfNfts }: { amountOfNfts: number }) => {
  return amountOfNfts * AVERAGE_COST_OF_MINT_1_AVERAGE_METADATA_JSON;
};
