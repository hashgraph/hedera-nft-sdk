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
import 'dotenv/config';
import { FeeFactory } from '../../feeFactory';
import { HederaNFTSDK } from '../../nftSDKFunctions';

export const operatorAccountId = process.env.FIRST_ACCOUNT_ID!;
export const operatorPrivateKey = process.env.FIRST_PRIVATE_KEY!;

export const secondAccountId = process.env.SECOND_ACCOUNT_ID!;
export const secondPrivateKey = process.env.SECOND_PRIVATE_KEY!;

export const nftSDK = new HederaNFTSDK(operatorAccountId, operatorPrivateKey, 'testnet');

export const feeFactoryInstance = new FeeFactory();
