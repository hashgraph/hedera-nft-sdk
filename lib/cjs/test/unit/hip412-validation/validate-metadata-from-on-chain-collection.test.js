"use strict";

var _axios = _interopRequireDefault(require("axios"));
var _mirrorNode = require("../../../api/mirror-node");
var _consts = require("../../__mocks__/consts");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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

jest.mock('axios');
const mockedAxios = _axios.default;
const mockResponsePage1 = {
  data: {
    nfts: [{
      id: 1,
      name: 'NFT 1'
    }, {
      id: 2,
      name: 'NFT 2'
    }],
    links: {
      next: _consts.NFT_FROM_TOKEN_EXAMPLE_BASE_URL
    }
  }
};
const mockResponsePage2 = {
  data: {
    nfts: [{
      id: 3,
      name: 'NFT 3'
    }],
    links: {
      next: null
    }
  }
};
describe('getNFTsFromToken', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });
  it('fetches all pages of NFTs collection correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockResponsePage1).mockResolvedValueOnce(mockResponsePage2);
    const result = await (0, _mirrorNode.getNFTsFromToken)('testnet', '1');
    expect(result.length).toBe(3);
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });
  it('properly handles HTTP errors', async () => {
    mockedAxios.get.mockRejectedValue(new Error(_consts.NETWORK_ERROR));
    await expect((0, _mirrorNode.getNFTsFromToken)('testnet', '1')).rejects.toThrow(_consts.NETWORK_ERROR);
  });
});
//# sourceMappingURL=validate-metadata-from-on-chain-collection.test.js.map