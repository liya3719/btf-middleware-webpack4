const fs = require('fs');
const path = require('path');
const baseDir = process.cwd();
const webpack = require('webpack');
const fsExtra = require('fs-extra');
/**
 * 复制webpack4中间件相关配置到项目目录
 */
if(!fs.existsSync(`${baseDir}/.babelrc`)) {
    fsExtra.copySync(path.join(__dirname, '../.babelrc'), `${baseDir}/.babelrc`);
}
if(!fs.existsSync(`${baseDir}/postcss.config.js`)) {
    fsExtra.copySync(path.join(__dirname, '../postcss.config.js'), `${baseDir}/postcss.config.js`);
}
if(!fs.existsSync(`${baseDir}/tsconfig.json`)) {
    fsExtra.copySync(path.join(__dirname,  '../tsconfig.json'), `${baseDir}/tsconfig.json`);
}
/**
 * @param {params} 项目使用配置
 * @param {params.publicPath} 输出路径dev和build
 * @param {params.isMulti} 是单页应用还是多页应用
 * @param {params.proxy} 代理接口配置
 * @param {params.build} 构建输出目录
 * @param {params.entry} 区分多页还是单页的入口
 */
module.exports = async function(params) {
    //定义webpack构建基本配置
    let baseConfig = {
        entry: '',
        output: '',
        module: {
            rules: [
                {
                    test: /\.(tpl|ejs)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [{
                        loader: 'ejs-loader'
                    }]
                },
                {
                    test: /\.jade$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [{
                        loader: 'jade-loader'
                    }]
                },
                {
                    test: /\.(ts|tsx)$/,
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
                        loader: 'file-loader',
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
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env)
            })
        ],
        resolve: {
            // 设置引用模块的别名
            alias: {},
            //告诉webpack解析模块时应该搜索的目录
            modules: [],
            //自动解析确定的扩展，能够使用户在引入模块时不带扩展
            extensions: ['.less', '.sass', '.scss', '.vue', '.ts', 'tsx', '.js', 'jsx', '.css', '.gif', '.png', '.jpg']
        },
        performance: {
            // 构建资源过大显示错误警告
            hints: 'error',
            // 入口文件超过290kb则显示性能提示
            maxEntrypointSize: 300000,
            // 构建文件后单个文件超过90kb后则显示性能提示
            maxAssetSize: 100000
        },
        // 外部扩展，从输出的bundle中排除依赖
        externals: {},
        // 统计信息，发生错误时提示
        state: 'errors-only'
    }
}