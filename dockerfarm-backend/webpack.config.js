const path = require('path');
// eslint-disable-next-line import/no-unresolved
const slsw = require('serverless-webpack');
const webpack = require('webpack');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: __dirname,
        exclude: /node_modules\/(?!(koa-bodyparser)\/).*/,
        loader: 'babel-loader',
        options: {
          plugins: ['transform-runtime'],
          presets: ['env'],
        },
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })],
};