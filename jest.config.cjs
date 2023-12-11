/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: [
    '/node_modules',
  ],
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
      }
    ]
  },
  "testEnvironment": "node",
  "roots": [
    "<rootDir>/"
  ],
}
