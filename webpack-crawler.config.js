const path = require('path');
const createConfig = require('./webpack-base.config');

module.exports = createConfig({
  target: 'node',
  entry: {
    crawler: './src/crawler/index',
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  }
});
