const path = require('path');
const dayjs = require('dayjs');
const webpack = require('webpack');

const BUILD_TIMESTAMP = JSON.stringify(dayjs().format());

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '...']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ BUILD_TIMESTAMP })
  ]
};
