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
  entry: './src/index.js',
  output: {
    filename: 'd3-downloadable.js',
    library: 'downloadable',
    libraryTarget: 'umd'
  }
}
