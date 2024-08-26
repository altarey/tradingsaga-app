const obfuscatingTransformer = require('react-native-obfuscating-transformer');
const typescriptTransformer = require('react-native-typescript-transformer');

module.exports = obfuscatingTransformer({
  upstreamTransformer: typescriptTransformer,
  /*
    obfuscatorOptions is based on Medium obfuscation, optimal performance
    Performance will 30-35% slower than without obfuscation
    https://github.com/javascript-obfuscator/javascript-obfuscator
    */
  obfuscatorOptions: {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: true,
    debugProtectionInterval: true,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false,
  },
});
