const { localizationValidator } = require('../../validator/validators/localization');
const validMetadata = require('./data/valid-HIP412.json');

let localization = {
    uri: "ipfs://QmWS1VAdMD353A6SDk9wNyvkT14kyCiZrNDYAad4w1tKqT/{locale}.json",
    default: "en",
    locales: ["es", "fr"]
}

describe("Localization validator tests", () => {
  test("it should not return an error if the `localization` is property is not present", () => {
    // Arrange 
    // Metatadata with attribute error
    let metadata = validMetadata;

    // Act
    const errors = localizationValidator(metadata);

    // Assert
    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBe(0);
  });

  test("it should return an empty array when passing a correct schema", () => {
    // Arrange
    let metadata = JSON.parse(JSON.stringify(validMetadata));
    metadata.localization = localization;

    // Act
    const errors = localizationValidator(metadata);

    // Assert
    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBe(0);
  });

  test("it should return an error for incorrect default language code", () => {
    // Arrange
    let metadata = JSON.parse(JSON.stringify(validMetadata));
    metadata.localization = JSON.parse(JSON.stringify(localization));
    metadata.localization.default = "eng";

    // Act
    const errors = localizationValidator(metadata);

    // Assert
    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBe(1);
    expect(errors[0].msg).toBe(
      "Default locale should be two-letter language code, got: eng"
    );
    expect(errors[0].type).toBe("localization");
  });

  test("it should return an error for incorrect language code in `localization.locales`", () => {
    // Arrange
    let metadata = JSON.parse(JSON.stringify(validMetadata));
    metadata.localization = JSON.parse(JSON.stringify(localization));
    metadata.localization.locales.push("ger");

    // Act
    const errors = localizationValidator(metadata);

    // Assert
    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBe(1);
    expect(errors[0].msg).toBe(
      "Locale should be two-letter language code, got: ger"
    );
    expect(errors[0].type).toBe("localization");
  });

  test("it should return an error if default locale appears in `localization.locales`", () => {
    // Arrange
    let metadata = JSON.parse(JSON.stringify(validMetadata));
    metadata.localization = JSON.parse(JSON.stringify(localization));
    metadata.localization.locales.push("nl");
    metadata.localization.default = "nl";

    // Act
    const errors = localizationValidator(metadata);

    // Assert
    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBe(1);
    expect(errors[0].msg).toBe(
      "Default locale should not appear in 'localization.locales'"
    );
    expect(errors[0].type).toBe("localization");
  });

  test("it should return an error for incorrect `localization.URI` format", () => {
    // Arrange
    let metadata = JSON.parse(JSON.stringify(validMetadata));
    metadata.localization = JSON.parse(JSON.stringify(localization));
    metadata.localization.uri = "ipfs://QmWS1VAdMD353A6SDk9wNyvkT14kyCiZrNDYAad4w1tKqT/locale.json"; // no {} brackets around locale.json

    // Act
    const errors = localizationValidator(metadata);

    // Assert
    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBe(1);
    expect(errors[0].msg).toBe(
      "URI should be of format <protocol>://<hash>/{locale}.json"
    );
    expect(errors[0].type).toBe("localization");
  });
});
