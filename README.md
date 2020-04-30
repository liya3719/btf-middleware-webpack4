#### 名称
btf-middleware-webpack4
#### 功能
抽离webpack4通用构建配置，对webpack版本4以下构建工具无缝升级，该工具支持对Vue、ts、es6、less、sass、scss编译
#### 参数说明
|参数|说明|类型|必选|
|:--:|:--:|:--:|:--:|:--|
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
### 测试
|参数|说明|类型|必选|
|:--:|:--:|:--:|:--:|
|top-status-change|顶部刷新区域状态变更时触发|提示区域状态|是|
|entry|构建入口(单页或多页)|Object|是|
#### 使用
```
const path = require('path');
const webpackBuild = require('../index');
const params = {
  entry: {
    app: path.resolve(__dirname, './src/main.js')
  },
  proxy: {
    api: ['/api', '/test'],
    target: 'http://localhost:3000'
  },
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
