/**
 * The SHA256 validator applies specific rules for SHA256 hashes,
 * mostly present in "checksum" fields to verify the integrity of images or other file types
 * 
 * @see https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md#checksum
 * 
 * @param {Object} instance - The JSON object to validate against a schema 
 * @returns {Array} - Contains no, one, or multiple error objects that describe errors for the validated {instance}
 */
const SHA256Validator = (instance) => {
  const sha256Regex = /^[0-9a-f]{64}$/i;
  const errors = [];

  if (instance.checksum && !sha256Regex.test(instance.checksum)) {
    errors.push({
      type: "SHA256",
      msg: `Not a SHA256 hash for checksum, got: ${instance.checksum}`
    });
  }

  if (instance.files) {
    instance.files.map((file) => {
      if (file.hasOwnProperty("checksum") && !sha256Regex.test(file.checksum)) {
        errors.push({
          type: "SHA256",
          msg: `Not a SHA256 hash for file, got: ${file.checksum}`
        });
      }
    });
  }

  return errors;
};

module.exports = {
  SHA256Validator
};
