#### 名称
btf-middleware-webpack4

<p align="left">
<a href="https://npmcharts.com/compare/btf-middleware-webpack4?minimal=true"><img src="https://img.shields.io/npm/dm/btf-middleware-webpack4.svg?sanitize=true" alt="Downloads"></a>
</p>

#### 功能
抽离webpack4通用构建配置，对webpack版本4以下构建工具无缝升级，该工具支持对Vue、ts、es6、less、sass、scss编译
#### 参数说明
|参数|说明|类型|必选|
|:--:|:--:|:--:|:--:|
|isMulti|是否为多页应用|Boolean|是|
|entry|构建入口(单页或多页)|Object|是|
|port|开发端口|Number|是|
|mode|开发模式|String|是 (developmemnt或 production)|
|env|同上|String|是(dev或prod)|
|srcPath|模板入口地址,提供给htmlWebpackPlugin使用|String|是| 
|proxy|开发环境代理对象|Object|是|
|modules|模块搜索内容|String|否|
|isAnalyzer|打包体积查看|Boolean|否|
|alias|别名|Object|否|
|externals|全局配置不打包的文件|Object|否|
|useTs|是否使用ts|Boolean|否|
#### 使用
```
const path = require('path');
const baseDir = process.cwd();
const srcPath = path.resolve(baseDir, 'src');
const webpackBuild = require('btf-middleware-webpack4');
const params = {
  isMulti: false,
  entry: {
    app: path.resolve(__dirname, './src/main.js')
  },
  proxy: {
    api: ['/api', '/test'],
    target: 'http://localhost:3000'
  },
  srcPath: srcPath,
  port: 8090,
  isAnalyzer: false,
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  externals: {
    vue: 'Vue'
  },
  mode: 'production',  // production or development
  modules: '',
  env: 'prod' // prod or dev
};
webpackBuild(params);
```
#### 说明
1、需要目标项目package.json webpack安装到4.x版本
#### 更新日志
#### 1.0.3版本更新内容如下
- 修复构建不输出html文件的问题
- 新增参数useTs,是否需要tsconfig.json配置
- development编译less\sasss\scss\stylus
- 调整baseConfig配置
- 修复development热更新失败问题
- 支持动态import
