const fs = require('fs');
const webpack = require('webpack');
const fsExtra = require('fs-extra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugi');
module.exports = async function (publicPath, env, isMulti = false) {
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
  }
}