module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-flow',
    '@babel/preset-typescript',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        // alias: {
        //   "tests": ["./tests/"],
        //   "@components": "./src/components",
        // }
      },
    ],
    ['@babel/plugin-import-glob-simplified',{
      trimFileExtensions:['js','jsx','ts','tsx'],
    }],
  ],
};
