const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outPath = path.join(__dirname, './build');
const isProduction = process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname, './src');
const assetsPath = path.join(__dirname, './assets');

module.exports = {
  context: sourcePath,
  entry: './renderer/index.tsx',
  output: {
    path: outPath,
    filename: 'bundle.js',
  },
  devtool: isProduction ? 'none' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules', sourcePath],
    alias: {
      src: sourcePath,
    },
  },
  devServer: {
    contentBase: outPath,
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
        include: [sourcePath, assetsPath],
        use: [{
          loader: 'file-loader',
          options: {
            name: './images/[name].[hash].[ext]',
          },
        }],
      },
      { test: /\.(woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=100000' }
    ]
  },
};
