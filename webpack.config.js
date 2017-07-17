const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const root = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist'),
};

/**
 * Whether we are in development or production
 * @type {Boolean}
 */
const IS_DEV = process.env.NODE_ENV !== 'production';

const devPlugings = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './template.html',
  }),
  new CopyPlugin([{ from: 'static', to: '' }]),
];

const prodPlugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new UglifyJsPlugin({
    sourceMap: false,
    comments: false,
  }),
  // Don't load all moment locales, only English and Italian
  new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|it)$/),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './template.html',
  }),
  new CopyPlugin([{ from: 'static', to: '' }]),
  new ExtractTextPlugin('styles.css'),
];

const devEntry = ['react-hot-loader/patch', root.src];

const prodEntry = [root.src];

module.exports = {
  devServer: IS_DEV
    ? {
      historyApiFallback: true,
      noInfo: false,
      port: 3000,
    }
    : {},
  devtool: IS_DEV ? 'eval' : 'source-map',
  entry: {
    main: IS_DEV ? devEntry : prodEntry,
  },
  output: {
    path: IS_DEV ? root.dest : root.dest,
    filename: 'js/main.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: IS_DEV,
            },
          },
        ],
        include: root.src,
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
        include: [/template\.html/],
      },
      {
        test: /\.css$/,
        use: IS_DEV
          ? [
            'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ]
          : ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{ loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader'],
          }),
        include: [root.src, /node_modules/],
      },
      {
        test: /\.scss$/,
        loader: IS_DEV
          ? [
            'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
              { loader: 'sass-loader', options: { includePaths: [root.src] } },
          ]
          : ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { importLoaders: 1 } },
                'postcss-loader',
                { loader: 'sass-loader', options: { includePaths: [root.src] } },
              ],
          }),
        include: root.src,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/i,
        loader: 'file-loader',
        query: {
          name: IS_DEV ? '[path][name].[ext]?[hash:5]' : 'assets/[name]_[hash:5].[ext]?[hash:5]',
        },
      },
    ],
  },
  plugins: IS_DEV ? devPlugings : prodPlugins,
};
