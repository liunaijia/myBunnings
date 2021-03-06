const path = require('path');
const createConfig = require('./webpack-base.config');

module.exports = createConfig({
  target: 'node',
  entry: {
    searchProducts: './src/api/searchProducts',
  },
  output: {
    path: path.resolve(__dirname, '.aws-sam/build'),
    filename: '[name]/index.js',
    library: 'index',
    libraryTarget: 'commonjs2',
  },
  externals: {
    'aws-sdk': 'aws-sdk',
  },
});
