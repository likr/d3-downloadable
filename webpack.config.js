module.exports = {
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    alias: {
      d3: './window-d3.js'
    }
  },
  entry: './index.js',
  output: {
    filename: 'd3-downloadable.js',
    library: 'downloadable',
    libraryTarget: 'umd'
  }
}
