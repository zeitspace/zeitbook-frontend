const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: {
    index: ['./src/index.js', './assets/stylesheets/index.scss'],
    post: './src/post.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          'css-loader',
          'sass-loader',
        ]),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'self.WEBPACK': true,
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new LiveReloadPlugin(),
  ],
};
