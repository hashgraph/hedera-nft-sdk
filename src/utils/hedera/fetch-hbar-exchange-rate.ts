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
import { HbarExchangeRate } from '../../types/estimate-create-collection';
import { dictionary } from '../constants/dictionary';
import { getMirrorNodeUrlForNetwork } from './get-mirror-node-url-for-network';
import axios from 'axios';

export const fetchHbarExchangeRate = async (network: string, mirrorNodeUrl?: string): Promise<HbarExchangeRate> => {
  try {
    const url = mirrorNodeUrl || getMirrorNodeUrlForNetwork(network);
    const { data } = await axios.get<HbarExchangeRate>(`${url}/network/exchangerate`);
    return data;
  } catch {
    throw new Error(dictionary.errors.cannotFetchHbarExchangeRate);
  }
};
