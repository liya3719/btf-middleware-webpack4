/**
 * dll动态链接库构建
 */
const path = require('path');
const webpack = require('webpack');
/**
 * @param { Array } entries 第三方固定框架，例如element-ui/underscore/vue等等
 * @param { string } outPath dll输出目录
 */
module.exports = async function( entries, outPath) {
    let dllWebpackConfig = {
        entry: {
            dll: entries
        },
        output: {
            path: outPath,
            filename: '[name].js',
            library: '[name]'
        },
        plugins: [
            new webpack.DllPlugin({
                context: __dirname,
                name: '[name]',
                path: `${outPath}/manifest.json`
            })
        ]
    }
}