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
import 'dotenv/config';
import { FeeFactory } from '../../feeFactory';
import { HederaNFTSDK } from '../../nftSDKFunctions';
import { PrivateKey } from '@hashgraph/sdk';

export const operatorAccountId = process.env.FIRST_ACCOUNT_ID!;
export const operatorPrivateKey = PrivateKey.fromStringDer(process.env.FIRST_PRIVATE_KEY!);

export const secondAccountId = process.env.SECOND_ACCOUNT_ID!;
export const secondPrivateKey = PrivateKey.fromStringDer(process.env.SECOND_PRIVATE_KEY!);

export const nftStorageApiKey = process.env.NFTSTORAGE_API_KEY!;
export const pinataApiKey = process.env.PINATA_API_KEY!;
export const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY!;
export const pinataJwtKey = process.env.PINATA_JWT_KEY!;
export const awsAccessKey = process.env.AWS_ACCESS_KEY!;
export const awsSecretKey = process.env.AWS_SECRET_KEY!;

export const nftSDK = new HederaNFTSDK(operatorAccountId, operatorPrivateKey, 'testnet');

export const feeFactoryInstance = new FeeFactory();

export const NETWORK = 'testnet';
export const IPFS_GATEWAY = 'https://cloudflare-ipfs.com/ipfs/';

export const LINK_TO_JSON_OBJECT_WITHOUT_ERRORS =
  'https://violet-written-whale-308.mypinata.cloud/ipfs/QmVbS1sbVWKe13RYUiwPkzG5cCESM2NHTx3CuhssYUvcRn';

export const LINK_TO_JSON_OBJECT_WITH_MISSING_FIELDS =
  'https://violet-written-whale-308.mypinata.cloud/ipfs/QmWC8VUgSkPM62mBznXqwqSvsCMSad1bxDzzqcwwYWueuf';

export const AMOUNT_OF_NFTS_TO_MINT = 35;
export const AMOUNT_OF_NFTS_TO_MINT_SINGLE = 3;
export const BATCH_SIZE = 5;
export const BATCH_SIZE_SINGLE = 1;
export const METADATA_TO_VALIDATE_OBJECT_SERIAL = 1;

export const ESTIMATE_ACCEPTABLE_DIFFERENCE_PERCENT = 0.01;
