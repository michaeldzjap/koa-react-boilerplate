const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack-plugin')

module.exports = {
  devtool: 'cheap-source-map',
  entry: {
    bundle: './app/client/index',
    vendor: ['react'],
    styles: './resources/assets/sass/main'
  },
  output: {
    path: path.join(__dirname, 'public/assets/js'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/assets/js/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader?sourceMap&minimize', 'resolve-url-loader', 'sass-loader?sourceMap']
        }),
        include: path.join(__dirname, 'resources/assets/sass')
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanWebpackPlugin(['public/assets'], {
      root: __dirname
    }),
    new ExtractTextPlugin('../css/[name].[chunkhash].css'),
    new PurifyCSSPlugin({
      basePath: __dirname,
      resolveExtensions: ['.js'],
      paths: [
        'app/server/html.js',
        'app/shared/components/*.js',
        'app/shared/views/*.js',
      ]
    }),
    new AssetsPlugin({
      path: path.join(__dirname, 'app/server'),
      prettyPrint: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        URL: JSON.stringify('0.0.0.0'),
        PORT: JSON.stringify('3000')
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  }
}
