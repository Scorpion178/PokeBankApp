module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@core': './src/core',
          '@shared': './src/shared',
          '@features': './src/features',
          '@assets': './src/assets',
          '@tests': './src/tests',
        },
      },
    ],
  ]
};
