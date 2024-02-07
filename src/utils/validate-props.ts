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
import { PrivateKey } from '@hashgraph/sdk';
import { dictionary } from './constants/dictionary';

export const validateProps = ({
  buffer = null,
  tokenId = null,
  amount = null,
  metaData = null,
  supplyKey = null,
}: {
  buffer?: number | null;
  tokenId?: string | null;
  amount?: number | null;
  metaData?: string | null;
  supplyKey?: PrivateKey | null;
}) => {
  if (buffer !== null && buffer > 10) throw new Error(dictionary.hederaActions.maxBatchSize);
  if (buffer !== null && buffer < 1) throw new Error(dictionary.hederaActions.minBatchSize);
  if (tokenId !== null && !tokenId) throw new Error(dictionary.hederaActions.tokenIdRequired);
  if (amount !== null && (!amount || amount < 1)) throw new Error(dictionary.hederaActions.minAmount);
  if (metaData !== null && !metaData) throw new Error(dictionary.hederaActions.metadataRequired);
  if (supplyKey !== null && !supplyKey) throw new Error(dictionary.hederaActions.supplyKeyRequired);
};
