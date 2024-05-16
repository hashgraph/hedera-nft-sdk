"use strict";

var _getHbarPriceInDollars = require("../../../helpers/get-hbar-price-in-dollars");
var _estimateNftMintingInHbar = require("../../../nftSDKFunctions/estimate-nft-minting-in-hbar");
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

jest.mock('../../../helpers/get-hbar-price-in-dollars');
describe('estimateNftMintingInHbar', () => {
  it('should correctly estimate the cost for minting NFTs', async () => {
    _getHbarPriceInDollars.getHbarPriceInDollars.mockResolvedValue({
      priceInDollars: 0.0824
    });
    const result = await (0, _estimateNftMintingInHbar.estimateNftMintingInHbar)({
      amountOfNfts: 5,
      network: 'testnet'
    });
    expect(result).toBe(1.2135922330097089);
  });
  it('should correctly estimate the cost for minting a single NFT', async () => {
    _getHbarPriceInDollars.getHbarPriceInDollars.mockResolvedValue({
      priceInDollars: 0.0824
    });
    const result = await (0, _estimateNftMintingInHbar.estimateNftMintingInHbar)({
      amountOfNfts: 1,
      network: 'testnet'
    });
    expect(result).toBe(0.24271844660194175);
  });
  it('should correctly estimate the cost for minting multiple NFTs', async () => {
    _getHbarPriceInDollars.getHbarPriceInDollars.mockResolvedValue({
      priceInDollars: 0.0824
    });
    const result = await (0, _estimateNftMintingInHbar.estimateNftMintingInHbar)({
      amountOfNfts: 10,
      network: 'testnet'
    });
    expect(result).toBe(2.4271844660194177);
  });
  it('should handle errors from getHbarPriceInDollars', async () => {
    _getHbarPriceInDollars.getHbarPriceInDollars.mockRejectedValue(new Error('Network error'));
    await expect((0, _estimateNftMintingInHbar.estimateNftMintingInHbar)({
      amountOfNfts: 5,
      network: 'testnet'
    })).rejects.toThrow('Network error');
  });
});
//# sourceMappingURL=estimate-nft-minting-in-hbar.test.js.map