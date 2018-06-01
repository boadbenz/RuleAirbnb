const merge = require('webpack-merge');
const common = require('./webpack.common.config');
const webpack = require('webpack');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      NODE_ENV: JSON.stringify('development'),
    },
  }),
];

module.exports = merge(common, {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server'],
  output: {
    publicPath: '/src/main/resources/static/build',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  devServer: {
    hot: true,
    inline: false,
    historyApiFallback: true,
  },
  plugins,
});
