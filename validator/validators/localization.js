/**
 * The localization validator applies specific rules for the localization object
 * such as validating two-letter language codes, the default locale, and the localization URI format.
 * If the localization field is not present (optional field), no errors are returned.
 * 
 * @see https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md#localization
 * 
 * @param {Object} instance - The JSON object to validate against a schema
 * @returns {Array} - Contains no, one, or multiple error objects that describe errors for the validated {instance}
 */
const localizationValidator = (instance) => {
  const localization = instance.localization;
  const errors = [];

  if (!localization) return errors; // localization is an optional field

  if (localization.default.length != 2) {
    // default should be two-letter language code
    errors.push({
      type: "localization",
      msg: `Default locale should be two-letter language code, got: ${localization.default}`
    });
  }

  // check for two-letter language codes in "locales"
  const notTwoLetterCode = localization.locales.filter(
    (locale) => locale.length != 2
  );
  if (notTwoLetterCode.length > 0) {
    notTwoLetterCode.map((locale) => {
      errors.push({
        type: "localization",
        msg: `Locale should be two-letter language code, got: ${locale}`
      });
    });
  }

  if (localization.locales.includes(localization.default)) {
    // default locale should not appear in locales array
    errors.push({
      type: "localization",
      msg: `Default locale should not appear in 'localization.locales'`
    });
  }

  // localization.uri should follow format <protocol>://<hash>/{locale}.json (check for last part "{locale}.json")
  if (!localization.uri.includes("/{locale}.json")) {
    errors.push({
      type: "localization",
      msg: `URI should be of format <protocol>://<hash>/{locale}.json`
    });
  }

  return errors;
};

module.exports = {
  localizationValidator,
};
