const fs = require('fs');
const webpack = require('webpack');
const fsExtra = require('fs-extra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackIncludeAssets = require('html-webpack-include-assets-plugin');
module.exports = async function (publicPath, env, enableDll = false, isMulti = false) {
  let webpackProdConfig = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [{
            loader: [MiniCssExtractPlugin.loader, "vue-style-loader", "css-loader"],
            options: {
              publicPath: publicPath,
              hmr: env === 'dev'
            }
          }]
        },
        {
          test: /\.less$/,
          use: [{
            loader: [MiniCssExtractPlugin.loader, "vue-style-loader", "less-loader", "css-loader"],
            options: {
              publicPath: publicPath,
              hmr: env === 'dev'
            }
          }]
        },
        {
          test: /\.styl(us)$/,
          use: [{
            loader: [MiniCssExtractPlugin.loader, "vue-style-loader", "stylus-loader", "css-loader"],
            options: {
              publicPath: publicPath,
              hmr: env === 'dev'
            }
          }]
        },
        {
          test: /\.(sc|sa)ss$/,
          use: [{
            loader: [MiniCssExtractPlugin.loader, "vue-style-loader", "sass-loader", "css-loader"],
            options: {
              publicPath: publicPath,
              hmr: env === 'dev'
            }
          }]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filname: '[name].css',
        chunkFilename: '[id].css'
      })
    ],
    optimization: {
      nodeEnv: 'prod',
      minimizer: [
        new OptimizeCssAssetsPlugin()
      ]
    }
  };
  // 启用dll构建则使用DllReferencePlugin webpack原生插件和HtmlWebpackIncludeAssets第三方插件
  if(enableDll) {
    webpackProdConfig.plugins.push(new webpack.DllReferencePlugin({
      manifest: `${publishPath}/manifest.json`,
      name: 'common'
    }));
    webpackProdConfig.plugins.push(new HtmlWebpackIncludeAssets({
      assets: ['/public/dll.js'],
      append: false
    }))
  }
}