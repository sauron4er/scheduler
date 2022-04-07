let path = require('path');
let BundleTracker = require('webpack-bundle-tracker');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
let pathsToClean = ['./static/bundles/*.*'];
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  context: __dirname,
  entry: {
    home: './static/webpack_index/home.js',
    // stats: './static/webpack_index/stats.js'
  },
  output: {
    path: path.resolve(__dirname, './static/bundles'), // Should be in STATICFILES_DIRS
    publicPath: '/static/', // Should match Django STATIC_URL
    filename: '[name].js', // No filename hashing, Django takes care of this
    chunkFilename: '[id]-[chunkhash].js' // DO have Webpack hash chunk filename
  },

  plugins: [
    new CleanWebpackPlugin({cleanAfterEveryBuildPatterns: pathsToClean}),
    new BundleTracker({filename: './webpack-stats.json'}),
    // new BundleAnalyzerPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, // to transform JSX into JS
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}]
      },
      // {
      //   test: /\.(woff|woff2|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
      //   loader: 'url-loader?limit=100000'
      // },
      // {
      //   test: /\.(?:png|jpe?g|svg)$/,
      //   loader: 'url-loader'
      // }
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   loader: 'file-loader'
      // }
    ]
  },

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'static'), path.resolve(__dirname, 'templates')],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      static: path.resolve(__dirname, 'static'),
      templates: path.resolve(__dirname, 'templates'),
      home: path.resolve(__dirname, 'home'),
      // stats: path.resolve(__dirname, 'stats')
    },

  },
};
