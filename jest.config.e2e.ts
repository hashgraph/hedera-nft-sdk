import type { JestConfigWithTsJest } from 'ts-jest';

const e2eConfig: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src/test$1',
    '^@mocks(.*)$': '<rootDir>/src/test/__mocks__$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/config/setupFilesAfterEnv.ts'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/src/test/e2e/**/*.(spec|test).(ts|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  reporters: ["default", ["jest-junit", {outputName: "junit-e2e.xml"}]]
};

export default e2eConfig;
