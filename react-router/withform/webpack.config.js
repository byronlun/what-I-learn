var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
    "./index.js"
  ],
  output: {
    path: './build',
    // publicPath: "http://localhost:8080/assets/",
    filename: "bundle.js",
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      query:{
        presets: ['react', 'es2015']
      },
      exclude: /node_modules/
    }]
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [],
}
