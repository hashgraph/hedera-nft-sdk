import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src/test$1',
    '^@mocks(.*)$': '<rootDir>/src/test/__mocks__$1',
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/src/test/**/*.(spec|test).(ts|tsx)', '!**/src/test/e2e/**/*.(spec|test).(ts|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
