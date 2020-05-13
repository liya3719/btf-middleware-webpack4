#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const baseDir = process.cwd();
const fsExtra = require('fs-extra');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
/**
 * @param {params} 项目使用配置
 */
module.exports = function (params) {
  //定义webpack构建基本配置
  let entry = ['webpack-hot-middleware/client?noInfo=true&reload=true'];
  for(let k in params.entry) {
    entry.push(params.entry[k]);
  };
  let baseConfig = {
    entry: entry,
    output: {
      path: params.mode == "development" ? '/' : path.resolve(baseDir, 'dist/'),
      sourceMapFilename: '[file].map',
      filename: params.mode == "development" ? "[name].[hash].js": "js/[name].[hash].js",
      libraryTarget: 'umd',
      publicPath: params.mode == "development" ? '/' : params.publicPath || './js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [
            'vue-loader'
          ]
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: [{
            loader: 'ts-loader'
          }]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [{
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [{
            loader: 'url-loader',
            options: {
              name: 'images/[name]_[hash].[ext]',
              limit: 8192,

            }
          }]
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?/i,
          use: [{
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              limit: 8192
            }
          }]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
    ],
    resolve: {
      // 设置引用模块的别名
      alias: params.alias,
      //告诉webpack解析模块时应该搜索的目录
      modules:  params.modules ? ["node_modules"].concat(params.modules) : ['node_modules'],
      //自动解析确定的扩展，能够使用户在引入模块时不带扩展
      extensions: ['.less', '.sass', '.scss', '.vue', '.ts', 'tsx', '.js', 'jsx', '.css', '.gif', '.png', '.jpg']
    },
    // 外部扩展，从输出的bundle中排除依赖
    externals: params.externals || {},
    // 统计信息，发生错误时提示
    stats: 'errors-only',
  };
  if(params.isAnalyzer) {
    baseConfig.plugins.push(
      new BundleAnalyzerPlugin()
    )
  };
  const webpackExtendConfig = require(`${baseDir}/webpack.config`);
  const config = require(`./webpack.${params.env}.config`)(params);
  let compileConfig = webpackMerge.smart(baseConfig, config);
  compileConfig = webpackMerge.smart(compileConfig, webpackExtendConfig);
  if(params.isMulti) {
    let config;
    for(let file in params.entry) {
      config = {
        template: path.resolve(params.srcPath, `${file}.html`),
        inject: 'body',
        chunks: ['common', file],
        filename: `${file}.html`
      }
    };
    compileConfig.plugins.push(
      new HtmlWebpackPlugin(config)
    )
  } else {
    compileConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: `${params.srcPath}/index.html`,
        inject: 'body',
      })
    )
  };
  /**
   * 复制webpack4中间件相关配置到项目目录
   */
  fsExtra.copySync(path.join(__dirname, '../.babelrc'), `${baseDir}/.babelrc`);
  if (!fs.existsSync(`${baseDir}/postcss.config.js`)) {
    fsExtra.copySync(path.join(__dirname, '../postcss.config.js'), `${baseDir}/postcss.config.js`);
  }
  if (params.useTs) {
    fsExtra.copySync(path.join(__dirname, '../tsconfig.json'), `${baseDir}/tsconfig.json`);
  }
  return compileConfig;
}