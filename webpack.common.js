const path = require('path');

const config = {
  entry: './src/AnalyticsEventHelper.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'analytics-event-helper.min.js',
    library: 'AnalyticsEventHelper',
    libraryTarget: 'window'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};

module.exports = config;
