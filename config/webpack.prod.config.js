const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
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
            'postcss-loader',
            'less-loader'
          ]
        },
        {
          test: /\.(sass|scss)$/,
          use: [
            'vue-style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
      }),
      new ProgressBarPlugin(),
    ],
    performance: {
      // 构建资源过大显示错误警告
      hints: 'error',
      // 入口文件超过290kb则显示性能提示
      maxEntrypointSize: 300000,
      // 构建文件后单个文件超过90kb后则显示性能提示
      maxAssetSize: 100000
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          exclude: /\.min\.js$/,
          cache: true,
          parallel: true,
          extractComments: true,
          // uglifyOptions: {
          //   compress: {
          //     unused: true,
          //     drop_debugger: true
          //   },
          //   output: {
          //     comments: false
          //   }
          // }
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
          styles: {
            name: 'app',
            test: /\.(c|le)ss$/,
            chunks: 'all',
            enforce: true,
          },
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