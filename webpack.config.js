const path = require('path');
const dayjs = require('dayjs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BUILD_TIMESTAMP = JSON.stringify(dayjs().format());

module.exports = {
  output: {
    path: __dirname
  },
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
    new webpack.DefinePlugin({ BUILD_TIMESTAMP }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '' },
      ]
    })
  ]
};
