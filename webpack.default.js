const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const paths = {
  out: path.join(__dirname, './build'),
  source: path.join(__dirname, './src'),
  assets: path.join(__dirname, './assets'),
  renderer: path.join(__dirname, './src/renderer'),
  main: path.join(__dirname, './src/main'),
}

const webpackModulesRule = {
  rules: [
    {
      test: /.tsx?$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/,
    },
    {
      test: /.js$/,
      loader: 'source-map-loader',
      enforce: 'pre',
    },
    {
      test: /\.css$/,
      use: [
        {loader: 'style-loader'},
        {loader: 'css-loader'},
      ],
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000',
    }
  ]
};

const commonConfig = {
  context: paths.source,
  output: {
    path: paths.out,
    filename: '[name].js',
  },
  devtool: isProduction ? undefined : 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules', paths.source],
    alias: {
      src: paths.source,
      renderer: paths.renderer,
      main: paths.main,
    },
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  devServer: {
    contentBase: paths.out,
    port: 8000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './renderer/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin([
      {from: '../package.json', to: '../build'},
    ]),
  ],
  module: webpackModulesRule,
};

module.exports = {commonConfig, isProduction};
