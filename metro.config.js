/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const IS_DEV_MODE = process.env.NODE_ENV === 'development';

module.exports = {
  transformer: {
    ...IS_DEV_MODE ? {} : {babelTransformerPath: require.resolve('./transformer')},
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
