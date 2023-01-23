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
const HIP10_1_0_0 = require("./HIP10@1.0.0.json");
const HIP412_2_0_0 = require("./HIP412@2.0.0.json");

const schemaMap = new Map();
schemaMap.set('1.0.0', HIP10_1_0_0);
schemaMap.set('2.0.0', HIP412_2_0_0);

const defaultVersion = '2.0.0'; // Default is HIP412@2.0.0

/**
 * Retrieves correct schema for the requested HIP412 metadata schema version.
 * If the version doesn't exist, it will return the default schema version "2.0.0".
 * 
 * @param {string} version - The schema version to load.
 * @return {Object} - Returns a json schema JSON object.
 */
const getSchema = (version) => {
    const validVersion = schemaMap.has(version);
    if (validVersion) {
        return schemaMap.get(version);
    }
    
    return schemaMap.get(defaultVersion);
}

module.exports = {
    getSchema,
    defaultVersion
}