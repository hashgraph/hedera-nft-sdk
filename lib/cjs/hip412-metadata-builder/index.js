"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hip412MetadataBuilder = void 0;
var _tokenMetadataValidator = require("../token-metadata-validator");
var _dictionary = require("../utils/constants/dictionary");
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

class Hip412MetadataBuilder {
  constructor() {
    this.metadataObject = {
      name: '',
      image: '',
      type: '',
      format: 'HIP412@2.0.0'
    };
  }
  setProperty(key, value) {
    if (this.metadataObject[key]) {
      throw new Error(_dictionary.dictionary.errors.metadataBuilder.fieldAlreadySet(key));
    }
    this.metadataObject[key] = value;
    return this;
  }
  setName(name) {
    return this.setProperty('name', name);
  }
  setImage(image) {
    return this.setProperty('image', image);
  }
  setType(type) {
    return this.setProperty('type', type);
  }
  setCreator(creator) {
    return this.setProperty('creator', creator);
  }
  setCreatorDID(creatorDID) {
    return this.setProperty('creatorDID', creatorDID);
  }
  setDescription(description) {
    return this.setProperty('description', description);
  }
  setChecksum(checksum) {
    return this.setProperty('checksum', checksum);
  }
  addAttribute(_ref) {
    let {
      trait_type,
      value,
      display_type,
      max_value
    } = _ref;
    const attribute = {
      trait_type,
      value,
      ...(display_type && {
        display_type
      }),
      ...(max_value !== undefined && {
        max_value
      })
    };
    this.metadataObject.attributes = this.metadataObject.attributes || [];
    this.metadataObject.attributes.push(attribute);
    return this;
  }
  addFile(_ref2) {
    let {
      uri,
      type,
      checksum,
      is_default_file,
      metadata,
      metadata_uri
    } = _ref2;
    if (!uri || !type) {
      throw new Error(_dictionary.dictionary.errors.metadataBuilder.uriAndTypeRequired);
    }
    const file = {
      uri,
      type,
      ...(checksum && {
        checksum
      }),
      ...(is_default_file !== undefined && {
        is_default_file
      }),
      ...(metadata && {
        metadata
      }),
      ...(metadata_uri && {
        metadata_uri
      })
    };
    if (!this.metadataObject.files) {
      this.metadataObject.files = [];
    }
    this.metadataObject.files.push(file);
    return this;
  }
  addProperty(_ref3) {
    let {
      key,
      value
    } = _ref3;
    if (!this.metadataObject.properties) {
      this.metadataObject.properties = {};
    }
    this.metadataObject.properties[key] = value;
    return this;
  }
  setLocalization(_ref4) {
    let {
      uri,
      default: defaultLocale,
      locales
    } = _ref4;
    if (this.metadataObject.localization) {
      throw new Error(_dictionary.dictionary.errors.metadataBuilder.localizationAlreadySet);
    }
    if (!uri || !defaultLocale || !locales || locales.length === 0) {
      throw new Error(_dictionary.dictionary.errors.metadataBuilder.localizatonFieldsMissing);
    }
    this.metadataObject.localization = {
      uri,
      default: defaultLocale,
      locales
    };
    return this;
  }
  build() {
    const validationResult = _tokenMetadataValidator.TokenMetadataValidator.validateSingleMetadataObject(this.metadataObject);
    return {
      validationResult,
      metadata: this.metadataObject
    };
  }
}
exports.Hip412MetadataBuilder = Hip412MetadataBuilder;
//# sourceMappingURL=index.js.map