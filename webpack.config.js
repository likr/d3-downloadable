const path = require('path')

const options = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'node_modules/svg-dataurl'),
          path.resolve(__dirname, 'example/src'),
          path.resolve(__dirname, 'index.js')
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
      }
    ]
  },
  entry: {
    bundle: './example/src/index'
  },
  output: {
    path: path.resolve(__dirname, 'example'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'example'),
    historyApiFallback: true,
    port: 8080
  }
}

module.exports = options
