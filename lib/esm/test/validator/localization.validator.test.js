/*-
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
const {
  localizationValidator
} = require('../../validator/validators/localization');
import validMetadata from './data/valid-HIP412';
const localization = {
  uri: 'ipfs://QmWS1VAdMD353A6SDk9wNyvkT14kyCiZrNDYAad4w1tKqT/{locale}.json',
  default: 'en',
  locales: ['es', 'fr']
};
describe('Localization validator tests', () => {
  test('it should not return an error if the `localization` is property is not present', () => {
    // Arrange
    // Metatadata with attribute error
    const metadata = validMetadata;

    // Act
    const errors = localizationValidator(metadata);

    // Assert
    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBe(0);
  });
  test('it should return an empty array when passing a correct schema', () => {
    // Arrange
    const metadata = JSON.parse(JSON.stringify(validMetadata));
    metadata.localization = localization;

    // Act
    const errors = localizationValidator(metadata);

    // Assert
    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBe(0);
  });
  test('it should return an error for incorrect default language code', () => {
    // Arrange
    const metadata = JSON.parse(JSON.stringify(validMetadata));
    metadata.localization = JSON.parse(JSON.stringify(localization));
    metadata.localization.default = 'eng';

    // Act
    const errors = localizationValidator(metadata);

    // Assert
    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBe(1);
    expect(errors[0].msg).toBe('Default locale should be two-letter language code, got: eng');
    expect(errors[0].type).toBe('localization');
  });
  test('it should return an error for incorrect language code in `localization.locales`', () => {
    // Arrange
    const metadata = JSON.parse(JSON.stringify(validMetadata));
    metadata.localization = JSON.parse(JSON.stringify(localization));
    metadata.localization.locales.push('ger');

    // Act
    const errors = localizationValidator(metadata);

    // Assert
    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBe(1);
    expect(errors[0].msg).toBe('Locale should be two-letter language code, got: ger');
    expect(errors[0].type).toBe('localization');
  });
  test('it should return an error if default locale appears in `localization.locales`', () => {
    // Arrange
    const metadata = JSON.parse(JSON.stringify(validMetadata));
    metadata.localization = JSON.parse(JSON.stringify(localization));
    metadata.localization.locales.push('nl');
    metadata.localization.default = 'nl';

    // Act
    const errors = localizationValidator(metadata);

    // Assert
    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBe(1);
    expect(errors[0].msg).toBe("Default locale should not appear in 'localization.locales'");
    expect(errors[0].type).toBe('localization');
  });
  test('it should return an error for incorrect `localization.URI` format', () => {
    // Arrange
    const metadata = JSON.parse(JSON.stringify(validMetadata));
    metadata.localization = JSON.parse(JSON.stringify(localization));
    metadata.localization.uri = 'ipfs://QmWS1VAdMD353A6SDk9wNyvkT14kyCiZrNDYAad4w1tKqT/locale.json'; // no {} brackets around locale.json

    // Act
    const errors = localizationValidator(metadata);

    // Assert
    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBe(1);
    expect(errors[0].msg).toBe('URI should be of format <protocol>://<hash>/{locale}.json');
    expect(errors[0].type).toBe('localization');
  });
});
//# sourceMappingURL=localization.validator.test.js.map