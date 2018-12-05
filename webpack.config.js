const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const paths = {
  out: path.join(__dirname, './build'),
  source: path.join(__dirname, './src'),
  assets: path.join(__dirname, './assets'),
  renderer: path.join(__dirname, './src/renderer'),
  main: path.join(__dirname, './src/main'),
}

module.exports = {
  context: paths.source,
  entry: './renderer/index.tsx',
  output: {
    path: paths.out,
    filename: 'bundle.js',
  },
  devtool: isProduction ? 'none' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules', paths.source],
    alias: {
      src: paths.source,
      renderer: paths.renderer,
      main: paths.main,
    },
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
  ],
  module: {
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
        test: /\.(png|jpg|gif|svg|jpeg|ico)$/,
        include: [paths.source, paths.assets],
        use: [{
          loader: 'file-loader',
          options: {
            name: './images/[name].[hash].[ext]',
          },
        }],
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
};
