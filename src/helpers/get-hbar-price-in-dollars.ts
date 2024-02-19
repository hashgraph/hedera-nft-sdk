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
import { HbarPrice } from '../types/estimate-create-collection';
import { fetchHbarExchangeRate } from '../utils/hedera/fetch-hbar-exchange-rate';

export const getHbarPriceInDollars = async (network: string, mirrorNodeUrl?: string): Promise<HbarPrice> => {
  const { current_rate, timestamp } = await fetchHbarExchangeRate(network, mirrorNodeUrl);
  const hbarPriceInCents = current_rate.cent_equivalent / current_rate.hbar_equivalent;

  return {
    priceInDollars: hbarPriceInCents / 100,
    timestamp,
  };
};
