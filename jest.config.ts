import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "/src/__test__/coverage",
  testEnvironment: "jsdom",
  preset: 'ts-jest'
};

export default config;
