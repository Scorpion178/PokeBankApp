module.exports = {
  preset: 'react-native',
  testMatch: ['**/?(*.)+(test).[tj]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js','@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-native-community' +
      '|react-native-vector-icons' +
      '|react-native-paper' +
      '|react-native-mmkv' +
      '|react-native-safe-area-context' +
      '|@react-navigation' +
      '|@shopify/flash-list' +
      ')/)',
  ],
};
