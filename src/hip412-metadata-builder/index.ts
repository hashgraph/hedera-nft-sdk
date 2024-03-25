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
import { Hip412Validator } from '../hip412-validator';
import { Attribute, FileMetadata, Localization, NFTMetadata, Property } from '../types/nft-metadata';
import { FileValidationResult } from '../types/hip412-validator';
import { dictionary } from '../utils/constants/dictionary';

interface Hip412MetadataBuilderResult {
  metadata: NFTMetadata;
  validationResult: FileValidationResult;
}

export class Hip412MetadataBuilder {
  private metadataObject: NFTMetadata;

  constructor() {
    this.metadataObject = {
      name: '',
      image: '',
      type: '',
      format: 'HIP412@2.0.0',
    };
  }

  private setProperty<T extends keyof NFTMetadata>(key: T, value: NFTMetadata[T]): Hip412MetadataBuilder {
    if (this.metadataObject[key]) {
      throw new Error(dictionary.errors.metadataBuilder.fieldAlreadySet(key));
    }
    this.metadataObject[key] = value;
    return this;
  }

  setName(name: string): Hip412MetadataBuilder {
    return this.setProperty('name', name);
  }

  setImage(image: string): Hip412MetadataBuilder {
    return this.setProperty('image', image);
  }

  setType(type: string): Hip412MetadataBuilder {
    return this.setProperty('type', type);
  }

  setCreator(creator: string): Hip412MetadataBuilder {
    return this.setProperty('creator', creator);
  }

  setCreatorDID(creatorDID: string): Hip412MetadataBuilder {
    return this.setProperty('creatorDID', creatorDID);
  }

  setDescription(description: string): Hip412MetadataBuilder {
    return this.setProperty('description', description);
  }

  setChecksum(checksum: string): Hip412MetadataBuilder {
    return this.setProperty('checksum', checksum);
  }

  addAttribute({ trait_type, value, display_type, max_value }: Attribute): Hip412MetadataBuilder {
    const attribute: Attribute = {
      trait_type,
      value,
      ...(display_type && { display_type }),
      ...(max_value !== undefined && { max_value }),
    };

    this.metadataObject.attributes = this.metadataObject.attributes || [];
    this.metadataObject.attributes.push(attribute);
    return this;
  }

  addFile({ uri, type, checksum, is_default_file, metadata, metadata_uri }: FileMetadata): Hip412MetadataBuilder {
    if (!uri || !type) {
      throw new Error(dictionary.errors.metadataBuilder.uriAndTypeRequired);
    }

    const file: FileMetadata = {
      uri,
      type,
      ...(checksum && { checksum }),
      ...(is_default_file !== undefined && { is_default_file }),
      ...(metadata && { metadata }),
      ...(metadata_uri && { metadata_uri }),
    };

    if (!this.metadataObject.files) {
      this.metadataObject.files = [];
    }

    this.metadataObject.files.push(file);
    return this;
  }

  addProperty({ key, value }: { key: string; value: string | number | boolean | object }): Hip412MetadataBuilder {
    if (!this.metadataObject.properties) {
      this.metadataObject.properties = {};
    }

    this.metadataObject.properties[key] = value;
    return this;
  }

  setLocalization({ uri, default: defaultLocale, locales }: Localization): Hip412MetadataBuilder {
    if (this.metadataObject.localization) {
      throw new Error(dictionary.errors.metadataBuilder.localizationAlreadySet);
    }

    if (!uri || !defaultLocale || !locales || locales.length === 0) {
      throw new Error(dictionary.errors.metadataBuilder.localizatonFieldsMissing);
    }

    this.metadataObject.localization = {
      uri,
      default: defaultLocale,
      locales,
    };

    return this;
  }

  build(): Hip412MetadataBuilderResult {
    const validationResult = Hip412Validator.validateSingleMetadataObject(this.metadataObject);
    return { validationResult, metadata: this.metadataObject };
  }
}
