"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localValidation = void 0;
var _path = _interopRequireDefault(require("path"));
var _index = require("../validator/index");
var _files = require("../helpers/files");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
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

const validateFiles = files => {
  const validationResults = {};
  const validator = new _index.Validator();
  files.forEach(file => {
    const result = validator.validate(file.filedata);
    validationResults[file.filename] = result;
  });
  return validationResults;
};

/**
 * Validate files locally
 *
 * @param {string} relative Relative path to folder containing files
 * @returns {Object<filename<string>, validationResults<Object>>}
 */
const localValidation = relativePath => {
  const absolutePath = _path.default.resolve(relativePath); // convert relative path to absolute path
  const filenames = (0, _files.getJSONFilesForDir)(absolutePath);
  const filedata = (0, _files.readFiles)(absolutePath, filenames);
  const validationResults = validateFiles(filedata);
  return validationResults;
};
exports.localValidation = localValidation;
//# sourceMappingURL=index.js.map