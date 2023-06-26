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

import { Instance, Error } from "../../types/validator.module";

/**
 * The attributes validator applies specific rules for attribute objects
 * such as validating the values for different display types.
 * If the "attributes" property is not present (optional field), no errors are returned.
 *
 * @see https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md#attributesdisplay_type
 *
 * @param {Object} instance - The JSON object to validate against a schema
 * @returns {Array} - Contains no, one, or multiple error objects that describe errors for the validated {instance}
 */
const attributesValidator = (instance: Instance): Error[] => {
  const attributes = instance.attributes;
  const errors: Error[] = [];
  const matchRGBColors = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/; // Match string "rgb(102,250,1)" and variations

  if (!attributes) return errors; // attributes is an optional field

  attributes.map((attribute) => {
    // Boost must be number value
    if (
      attribute.display_type === "boost" &&
      typeof attribute.value !== "number"
    ) {
      errors.push({
        type: "attribute",
        msg: `Trait ${
          attribute.trait_type
        } of type 'boost' requires number, found ${typeof attribute.value}`,
      });
    }

    // Percentage between [0-100]
    if (attribute.display_type === "percentage") {
      if (typeof attribute.value !== "number") {
        errors.push({
          type: "attribute",
          msg: `Trait ${
            attribute.trait_type
          } of type 'percentage' requires number, found ${typeof attribute.value}`,
        });
      } else if (attribute.value < 0 || attribute.value > 100) {
        errors.push({
          type: "attribute",
          msg: `Trait ${attribute.trait_type} of type 'percentage' must be between [0-100], found ${attribute.value}`,
        });
      }
    }

    // Check for RGB format and values between[0-255]
    if (attribute.display_type === "color") {
      if (matchRGBColors.exec(attribute.value as string) === null) {
        // format validation
        errors.push({
          type: "attribute",
          msg: `Trait ${attribute.trait_type} of type 'color' requires format 'rgb(number,number,number)'`,
        });
      } else {
        // value validation range [0-255]
        let RGBValues = (attribute.value as string).match(/\d+/g);
        if (!RGBValues) return;
        RGBValues.map((rgbVal: string) => {
          if (parseInt(rgbVal) < 0 || parseInt(rgbVal) > 255) {
            errors.push({
              type: "attribute",
              msg: `Trait ${attribute.trait_type} of type 'color' requires RGB values between [0-255], got value: ${rgbVal}`,
            });
          }
        });
      }
    }

    // Check datetime format: should be integer e.g. 732844800
    if (
      (attribute.display_type === "datetime" ||
        attribute.display_type === "date") &&
      !Number.isInteger(attribute.value as number)
    ) {
      errors.push({
        type: "attribute",
        msg: `Trait ${attribute.trait_type} of type '${
          attribute.display_type
        }' requires integer value, got type: ${typeof attribute.value}`,
      });
    }
  });

  return errors;
};

export { attributesValidator };
