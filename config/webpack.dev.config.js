const path = require('path');
const baseDir = process.cwd();
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin();
/**
 * 开发环境相关配置
 * @param {boolean} isMulti 是否多页应用
 */
module.exports = function (isMulti = false, isAnalyzer = false) {
  let webpackConfig = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [{
            loader: 'vue-loader',
            options: {
              css: ['vue-style-loader', 'css-loader'],
              less: ['vue-style-loader', 'less-loader', 'css-loader'],
              sass: ['vue-style-loader', 'sass-loader', 'css-loader'],
              stylus: ['vue-style-loader', 'stylus-loader', 'css-loader']
            }
          }]
        },
        {
          test: /\.css$/,
          use: [{
            loader: ['vue-style-loader', 'css-loader'],
            options: {
              // 支持开启css Modules
              modules: true
            }
          }]
        },
        {
          test: /\.less$/,
          use: [{
            loader: ['vue-style-loader', 'less-loader', 'css-loader'],
            options: {
              // 支持开启css Modules
              modules: true
            }
          }]
        },
        {
          test: /\.styl(us)?$/,
          use: [{
            loader: ['vue-style-loader', 'stylus-loader', 'css-loader'],
            options: {
              // 支持开启css Modules
              modules: true
            }
          }]
        },
        {
          test: /\.(scss|sass)$/,
          use: [{
            loader: ['vue-style-loader', 'sass-loader', 'css-loader'],
            options: {
              // 支持开启css Modules
              modules: true
            }
          }]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      isAnalyzer ? new BundleAnalyzerPlugin : ''
    ],
    optimization: {
      splitChunks: {

      },
      runtimeChunk: {

      },
      nodeEnv: 'env'
    },
    devtool: "cheap-source-map"
  };
  if (!isMulti) {
    webpackConfig.optimization.splitChunks = {
      chunks: "async",
      minSize: 30000,
      minChunks: 3,
      maxAsyncRequest: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        common: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      },
      default: {
        minChunks: 3,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }
}