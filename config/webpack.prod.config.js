#!/usr/bin/env node
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = function (params) {
  let webpackProdConfig = {
    mode: params.mode,
    module: {
      rules: [{
          test: /\.css$/,
          use: [
            'vue-style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            'vue-style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader'
          ]
        },
        {
          test: /\.(sass|scss)$/,
          use: [
            'vue-style-loader',
            MiniCssExtractPlugin.loader,
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      })
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          exclude: /\.min\.js$/,
          cache: true,
          parallel: true,
          extractComments: true,
          uglifyOptions: {
            compress: {
              unused: true,
              drop_debugger: true
            },
            output: {
              comments: false
            }
          }
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/,
          cssProcessorOptions: {
            safe: true,
            autoprefixer: {
              disable: true
            },
            mergeLonghand: false,
            discardComments: {
              removeAll: true
            }
          },
          canPrint: true
        })
      ],
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: (module) => {
              return /node_modules/.test(module.context)
            },
            name: 'vendors',
            minSize: 30000,
            chunks: 'initial',
            priority: 1
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    devtool: 'source-map'
  };
  return webpackProdConfig;
}