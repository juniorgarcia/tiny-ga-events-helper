const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          drop_console: true
        }
      }
    })
  ]
});
