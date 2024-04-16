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
import { estimateNftMintingInDollars } from '../../../nftSDKFunctions/estimate-nft-minting-in-dollars';

describe('estimateNftMintingInDollars', () => {
  it('should return correct estimate for 1 NFT', async () => {
    const result = await estimateNftMintingInDollars({ amountOfNfts: 1 });
    expect(result).toBe(0.02);
  });

  it('should return correct estimate for multiple NFTs', async () => {
    const result = await estimateNftMintingInDollars({ amountOfNfts: 5 });
    expect(result).toBe(0.1);
  });
});
