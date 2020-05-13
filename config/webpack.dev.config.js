#!/usr/bin/env node
const webpack = require('webpack');
/**
 * 开发环境相关配置
 * @param {boolean} isMulti 是否多页应用
 */
module.exports = function (params) {
  let webpackConfig = {
    mode: params.mode,
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            {
              loader: 'postcss-loader'
            },
            'css-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            'vue-style-loader',
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 1
              }
            },
            "postcss-loader",
            "less-loader"
          ]
        },
        {
          test: /\.(sass|scss)$/,
          use: [
            'vue-style-loader',
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 1
              }
            },
            "postcss-loader",
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    performance: {
      hints: false,
    },
    devtool: params.devtool || "inline-source-map"
  };
  return webpackConfig;
}