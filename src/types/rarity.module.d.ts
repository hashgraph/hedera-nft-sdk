/*-
 *
 * Hedera NFT Utilities
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

import { Instance } from "./validator";

export interface NFTFile {
    filedata: Instance;
    filename: string;
}

export interface NFTAttribute {
    trait_type: string;
    value: string;
}

export interface ValueObject {
    value: string;
    count: number;
}

export interface AttributeConfig {
    trait_type: string;
    values: ValueObject[];
}

export interface RarityResult {
    rarity: string;
    NFT: number;
    filename: string;
}
