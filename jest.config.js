module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/test/**/*.test.js'],
  moduleFileExtensions: ['js'],
  // Specify the test environment
  testEnvironment: 'jest-environment-jsdom',
  // ... other Jest configuration options
};