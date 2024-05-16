"use strict";

var _attributes = require("../../validator/validators/attributes");
var _validHIP = _interopRequireDefault(require("./data/valid-HIP412"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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

describe('Attributes validator tests', () => {
  test('it should return an empty array when passing a correct schema', () => {
    // Arrange
    const metadata = JSON.parse(JSON.stringify(_validHIP.default));

    // Act
    const errors = (0, _attributes.attributesValidator)(metadata);

    // Assert
    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBe(0);
  });
  describe('Boost display type tests', () => {
    test('it should not return an error for a correct `display_type=boost`', () => {
      // Arrange
      const metadata = JSON.parse(JSON.stringify(_validHIP.default));
      metadata.attributes = [{
        trait_type: 'Background',
        display_type: 'boost',
        value: 100
      }];

      // Act
      const errors = (0, _attributes.attributesValidator)(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(0);
    });
    test('it should return an error for wrong type for `display_type=boost`', () => {
      // Arrange
      const metadata = JSON.parse(JSON.stringify(_validHIP.default));
      metadata.attributes = [{
        trait_type: 'Background',
        display_type: 'boost',
        value: 'Yellow'
      }];

      // Act
      const errors = (0, _attributes.attributesValidator)(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(1);
      expect(errors[0].msg).toBe("Trait Background of type 'boost' requires number, found string");
      expect(errors[0].type).toBe('attribute');
    });
  });
  describe('Percentage display type tests', () => {
    test('it should not return an error for a correct `display_type=percentage`', () => {
      // Arrange
      const metadata = JSON.parse(JSON.stringify(_validHIP.default));
      metadata.attributes = [{
        trait_type: 'Background',
        display_type: 'percentage',
        value: 100
      }];

      // Act
      const errors = (0, _attributes.attributesValidator)(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(0);
    });
    test('it should return an error for wrong type for `display_type=percentage`', () => {
      // Arrange
      const metadata = JSON.parse(JSON.stringify(_validHIP.default));
      metadata.attributes = [{
        trait_type: 'Background',
        display_type: 'percentage',
        value: '101'
      }];

      // Act
      const errors = (0, _attributes.attributesValidator)(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(1);
      expect(errors[0].msg).toBe("Trait Background of type 'percentage' requires number, found string");
      expect(errors[0].type).toBe('attribute');
    });
    test('it should return an error for wrong value for `display_type=percentage`', () => {
      // Arrange
      // Metatadata with percentage being higher than 100
      const metadata = JSON.parse(JSON.stringify(_validHIP.default));
      metadata.attributes = [{
        trait_type: 'Background',
        display_type: 'percentage',
        value: 101
      }];

      // Act
      const errors = (0, _attributes.attributesValidator)(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(1);
      expect(errors[0].msg).toBe("Trait Background of type 'percentage' must be between [0-100], found 101");
      expect(errors[0].type).toBe('attribute');
    });
  });
  describe('Color display type tests', () => {
    test('it should not return an error for a correct `display_type=color`', () => {
      // Arrange
      const metadata = JSON.parse(JSON.stringify(_validHIP.default));
      metadata.attributes = [{
        trait_type: 'Background',
        display_type: 'color',
        value: 'rgb(101,50,1)'
      }];

      // Act
      const errors = (0, _attributes.attributesValidator)(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(0);
    });
    test('it should return an error for wrong format RGB values of `display_type=color`', () => {
      // Arrange
      // Metadata error: RGB value has an extra space
      const metadata = JSON.parse(JSON.stringify(_validHIP.default));
      metadata.attributes = [{
        trait_type: 'Background',
        display_type: 'color',
        value: 'rgb (101,50,1)'
      }];

      // Act
      const errors = (0, _attributes.attributesValidator)(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(1);
      expect(errors[0].msg).toBe("Trait Background of type 'color' requires format 'rgb(number,number,number)'");
      expect(errors[0].type).toBe('attribute');
    });
    test('it should return an error for wrong RGB number for `display_type=color`', () => {
      // Arrange
      const metadata = JSON.parse(JSON.stringify(_validHIP.default));
      metadata.attributes = [{
        trait_type: 'Background',
        display_type: 'color',
        value: 'rgb(101,256,1)'
      }];

      // Act
      const errors = (0, _attributes.attributesValidator)(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(1);
      expect(errors[0].msg).toBe("Trait Background of type 'color' requires RGB values between [0-255], got value: 256");
      expect(errors[0].type).toBe('attribute');
    });
  });
  describe('Datetime and date display type tests', () => {
    test('it should not return an error for a correct `display_type=datetime` or `display_type=date`', () => {
      // Arrange
      const metadata = JSON.parse(JSON.stringify(_validHIP.default));
      metadata.attributes = [{
        trait_type: 'Background',
        display_type: 'datetime',
        value: 732844800
      }, {
        trait_type: 'Background',
        display_type: 'date',
        value: 732844800
      }];

      // Act
      const errors = (0, _attributes.attributesValidator)(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(0);
    });
    test('it should return an error for wrong type for `display_type=datetime` or `display_type=date`', () => {
      // Arrange
      // Metatadata with percentage being of type string
      const metadata = JSON.parse(JSON.stringify(_validHIP.default));
      metadata.attributes = [{
        trait_type: 'Background',
        display_type: 'datetime',
        value: '732844800'
      }, {
        trait_type: 'Background',
        display_type: 'date',
        value: '732844800'
      }];

      // Act
      const errors = (0, _attributes.attributesValidator)(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(2);
      expect(errors[0].msg).toBe("Trait Background of type 'datetime' requires integer value, got type: string");
      expect(errors[0].type).toBe('attribute');
      expect(errors[1].msg).toBe("Trait Background of type 'date' requires integer value, got type: string");
      expect(errors[1].type).toBe('attribute');
    });
  });
});
//# sourceMappingURL=attributes.validator.test.js.map