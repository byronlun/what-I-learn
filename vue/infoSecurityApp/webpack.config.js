const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './index.js',

  output: {
    path: './dist',
    publicPath: 'dist',
    filename: 'build.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.vue$/,
      loader: 'vue'
    }]
  },

  vue: {
    loaders: {
      js: 'babel'
    }
  },

  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  }
}