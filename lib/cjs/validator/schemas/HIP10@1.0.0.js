"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  'title': 'Token Metadata',
  'type': 'object',
  'properties': {
    'version': {
      'type': 'string',
      'description': 'Semantic version for the metadata JSON format.'
    },
    'name': {
      'type': 'string',
      'description': 'Identifies the asset to which this token represents.'
    },
    'decimals': {
      'type': 'integer',
      'description': 'The number of decimal places that the token amount should display.'
    },
    'description': {
      'type': 'string',
      'description': 'Describes the asset to which this token represents.'
    },
    'image': {
      'type': 'string',
      'description': 'A URI pointing to a resource with mime type image/* representing the asset to which this token represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 0.7:1 inclusive.'
    },
    'properties': {
      'type': 'object',
      'description': 'Arbitrary properties. Values may be strings, numbers, object or arrays.'
    },
    'localization': {
      'type': 'object',
      'required': ['uri', 'default', 'locales'],
      'properties': {
        'uri': {
          'type': 'string',
          'description': 'The URI pattern to fetch localized data from. This URI should contain the substring `{locale}` which will be replaced with the appropriate locale value before sending the request.'
        },
        'default': {
          'type': 'string',
          'description': 'The locale of the default data within the base JSON'
        },
        'locales': {
          'type': 'array',
          'description': 'The list of locales for which data is available. These locales should conform to those defined in the Unicode Common Locale Data Repository (http://cldr.unicode.org/).'
        }
      }
    }
  }
};
//# sourceMappingURL=HIP10@1.0.0.js.map