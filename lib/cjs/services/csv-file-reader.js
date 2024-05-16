"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CSVReaderError = void 0;
exports.readCSVFile = readCSVFile;
var _fs = _interopRequireDefault(require("fs"));
var _nftsLimitError = require("../utils/constants/nfts-limit-error");
var _dictionary = require("../utils/constants/dictionary");
var _csvParser = _interopRequireDefault(require("csv-parser"));
var _selectSeparator = require("../helpers/select-separator");
var _csvConstants = require("../utils/constants/csv-constants");
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

class CSVReaderError extends Error {
  constructor(message, id) {
    super(message);
    this.id = id;
  }
}
exports.CSVReaderError = CSVReaderError;
function checkForErrorsAndLimit(_ref) {
  let {
    headersErrors,
    limit,
    currentRowCount
  } = _ref;
  if (headersErrors.length) {
    throw new CSVReaderError(headersErrors[0], 'invalid-headers');
  }
  const effectiveLimit = Number(limit) + _csvConstants.OMITTED_HEADER_COUNT;
  if (limit && currentRowCount >= effectiveLimit) {
    throw new Error(_nftsLimitError.NFTS_LIMIT_ERROR);
  }
}
function processHeader(header, currentType, propertyIndex, attributesIndex, refToErrorArray) {
  let result = null;

  // TODO: try to simplyfy this
  if (header.header === _csvConstants.ATTRIBUTES) {
    currentType = _csvConstants.ATTRIBUTES;
    attributesIndex++;
  } else if (header.header === _csvConstants.PROPERTIES) {
    currentType = _csvConstants.PROPERTIES;
    propertyIndex = 1;
  } else if (!currentType) {
    return {
      result: header.header,
      currentType,
      propertyIndex,
      attributesIndex
    };
  }
  if (header.header !== '' && header.header !== _csvConstants.ATTRIBUTES && header.header !== _csvConstants.PROPERTIES) {
    refToErrorArray.push(_dictionary.dictionary.validation.errorInCellWithHeader(1, header.index + 1));
  }
  if (propertyIndex > 1 && header.header === _csvConstants.PROPERTIES || attributesIndex > 1 && header.header === _csvConstants.ATTRIBUTES) {
    refToErrorArray.push(_dictionary.dictionary.validation.errorInCellWithHeader(1, header.index + 1));
  }
  if (currentType === _csvConstants.PROPERTIES) {
    result = `${_csvConstants.PROPERTIES}_${propertyIndex}`;
    propertyIndex++;
  }
  if (currentType === _csvConstants.ATTRIBUTES) {
    result = `${_csvConstants.ATTRIBUTES}_${attributesIndex}`;
    attributesIndex++;
  }
  return {
    result,
    currentType,
    propertyIndex,
    attributesIndex
  };
}
async function readCSVFile(absolutePath, limit) {
  const separator = (0, _selectSeparator.selectSeparator)();
  const rows = [];
  const readStream = _fs.default.createReadStream(absolutePath);
  const headersErrors = [];
  try {
    await new Promise((resolve, reject) => {
      readStream.pipe((0, _csvParser.default)({
        separator,
        mapHeaders: mapHeadersForCSV(headersErrors)
      })).on('data', row => {
        try {
          checkForErrorsAndLimit({
            headersErrors,
            limit,
            currentRowCount: rows.length
          });
          rows.push(row);
        } catch (e) {
          return reject(e);
        }
      }).on('end', () => resolve(readStream.read())).on('error', e => {
        return reject(e);
      });
    });
  } catch (e) {
    // We want to throw only error related to CSV headers. In this case we want to ignore errors like limit for example and return rows as it is so the whole process can continue.
    if (e instanceof CSVReaderError) {
      throw e;
    }
  }
  return rows;
}
function mapHeadersForCSV(refToErrorArray) {
  let propertyIndex = 0;
  let attributesIndex = 0;
  let currentType = null;
  return header => {
    const {
      result,
      currentType: updatedType,
      propertyIndex: updatedPropertyIndex,
      attributesIndex: updatedAttributesIndex
    } = processHeader(header, currentType, propertyIndex, attributesIndex, refToErrorArray);
    currentType = updatedType;
    propertyIndex = updatedPropertyIndex;
    attributesIndex = updatedAttributesIndex;
    return result;
  };
}
//# sourceMappingURL=csv-file-reader.js.map