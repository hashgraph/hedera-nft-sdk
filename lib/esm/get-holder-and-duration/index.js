/*-
 *
 * Hedera NFT SDK
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
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
import { formatISO, fromUnixTime } from 'date-fns';
import { dictionary } from '../utils/constants/dictionary';
import { getSingleNFTDetails, getLastOwnershipTransferForNft } from '../api/mirror-node';
export const getHolderAndDuration = async ({
  tokenId,
  serialNumber,
  network
}) => {
  const nftDetailsData = await getSingleNFTDetails(network, tokenId, serialNumber);
  if (nftDetailsData.deleted) {
    throw new Error(dictionary.errors.nftDeleted);
  }
  const transactionsData = await getLastOwnershipTransferForNft(network, tokenId, serialNumber);
  if (!transactionsData) {
    throw new Error(dictionary.errors.nftNoTransactions);
  }
  const date = fromUnixTime(Number(transactionsData.consensus_timestamp));
  const readableDate = formatISO(date);
  return {
    holder: transactionsData.receiver_account_id,
    holderSince: readableDate
  };
};
//# sourceMappingURL=index.js.map