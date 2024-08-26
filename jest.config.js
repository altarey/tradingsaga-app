module.exports = {
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup-tests.ts'],
  testPathIgnorePatterns: ['<rootDir>/__tests__/setup-tests.ts'],
  preset: 'react-native',
  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js', '<rootDir>/__tests__/setup-tests.ts'],
  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '\\.(jpg|ico|png|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  modulePathIgnorePatterns: ['<rootDir>/app/tickers/tickers-submodule'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!react-native|static-container)/'],
  watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/app/tickers/json/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
