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
  srcPath: '',
  externals: {
    vue: 'Vue'
  },
  mode: 'production',  // production or development
  modules: '',
  env: 'prod' // prod or dev
};
webpackBuild(params);