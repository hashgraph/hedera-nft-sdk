module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:compat/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    sourceType: 'module',
    ecmaVersion: 6,
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: ['@typescript-eslint', 'deprecation', 'ie11'],
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],

    '@typescript-eslint/semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'max-classes-per-file': 'off',
    'no-console': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-redeclare': 'error',
    'no-return-await': 'error',
    'prefer-const': 'error',
  },
};
  