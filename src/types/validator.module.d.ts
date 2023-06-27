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
interface Attribute {
  display_type: string;
  trait_type: string;
  value: string | number;
}

interface Localization {
  uri: string;
  default: string;
  locales: string[];
}

interface File {
  uri: string;
  checksum: string;
  type: string;
  is_default_file: boolean;
  metadata: Object;
  metadata_uri: string;
}

export interface Instance {
  name: string;
  creator: string;
  creatorDID: string;
  description: string;
  image: string;
  checksum: string;
  type: string;
  format: string;
  properties: Object;
  files: File[];
  attributes: Attribute[];
  localization: Localization;
}

export interface Error {
  type: string;
  msg: string;
}

export interface Problem {
  type: string;
  msg: string;
  path: string;
}

export interface ValidationResult {
  errors: Error[];
  warnings: Problem[];
}

export interface Schema {
  tag: string;
  schemaObject: Object;
}
