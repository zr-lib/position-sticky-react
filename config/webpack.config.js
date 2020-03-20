const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BannerPlugin = require('webpack').BannerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const postcssNormalize = require('postcss-normalize');

const util = require('./util');

const shouldUseSourceMap = false;

const resolvePath = _path => path.resolve(__dirname, _path);
const paths = {
  entry: resolvePath('../src/index.tsx'),
  publicPath: '.',
  srcPath: resolvePath('../src'),
  outputPath: resolvePath('../dist')
};

const package = fs.readFileSync(resolvePath('../package.json'), {
  encoding: 'utf-8'
});
const { version } = JSON.parse(package);
const banner = `position-sticky\nversion: ${version}\nbuild: ${util.getTime()}`;

module.exports = {
  mode: 'production',
  entry: paths.entry,
  output: {
    filename: 'index.js',
    chunkFilename: '[name].js',
    // globalObject: 'this',
    library: 'PositionSticky',
    libraryTarget: 'commonjs2',
    path: paths.outputPath,
    publicPath: paths.publicPath
  },
  resolve: { extensions: ['.css', '.js', 'tsx'] },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    }
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js|jsx|ts|tsx$/,
        loader: 'babel-loader',
        include: paths.srcPath,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009'
                  },
                  stage: 3
                }),
                postcssNormalize()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BannerPlugin(banner),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ]
};
