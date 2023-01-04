const HIP412_1_0_0 = require("./HIP412@1.0.0.json");

const schemaMap = new Map();
schemaMap.set('1.0.0', HIP412_1_0_0);

const defaultVersion = '1.0.0'; // Default is HIP412@1.0.0

/**
 * Retrieves correct schema for the requested HIP412 metadata schema version.
 * If the version doesn't exist, it will return the default schema version "1.0.0".
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