export default {
  preset: 'react-native',
  testMatch: ['**/__tests__/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: ['/node_modules/(?!(@react-native|react-native)/).*/'],
  setupFiles: ['./src/setup.ts'],
};
