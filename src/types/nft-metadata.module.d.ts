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
export interface FileMetadata {
  uri: string;
  type: string;
  metadata?: NFTMetadata;
  checksum?: string;
  is_default_file?: boolean;
  metadata_uri?: string;
}

export interface Property {
  [k: string]: string | number | boolean | object;
}

export type DisplayType = 'text' | 'boolean' | 'percentage' | 'boost' | 'datetime' | 'date' | 'color';

export interface Attribute {
  trait_type: string;
  display_type?: DisplayType;
  value: string;
  max_value?: string | number;
}

export interface Localization {
  uri: string;
  default: string;
  locales: string[];
}

export interface NFTMetadata {
  name: string;
  image: string;
  description?: string;
  creator?: string;
  creatorDID?: string;
  type: string;
  files?: FileMetadata[];
  format?: 'HIP412@2.0.0';
  properties?: Property;
  attributes?: Attribute[];
  localization?: Localization;
}
