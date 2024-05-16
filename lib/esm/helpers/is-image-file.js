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
import some from 'lodash/some';
import { KNOWN_IMAGE_EXTENSIONS, KNOWN_IMAGE_MIME_TYPES } from '../utils/constants/mime-types-and-extensions';
export const isImageFile = (fileName, mimeType) => {
  if (!mimeType || !fileName) return false;
  const bufferFileExtension = fileName.split('.')[fileName.split('.').length - 1];
  const isKnownExtension = some(KNOWN_IMAGE_EXTENSIONS, el => el === bufferFileExtension);
  const isKnownMimeType = some(KNOWN_IMAGE_MIME_TYPES, knownMimeType => mimeType.includes(knownMimeType));
  return isKnownMimeType || isKnownExtension;
};
//# sourceMappingURL=is-image-file.js.map