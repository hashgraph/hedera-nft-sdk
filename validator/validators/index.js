const { schemaValidator } = require("./schema");
const { attributesValidator } = require("./attributes");
const { localizationValidator } = require("./localization");
const { SHA256Validator } = require("./SHA256");

module.exports = {
    schemaValidator,
    attributesValidator,
    localizationValidator,
    SHA256Validator
}