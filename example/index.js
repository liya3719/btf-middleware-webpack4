const path = require('path');
const baseDir = process.cwd();
const webpackBuild = require('../index');
const params = {
  isMulti: false,
  entry: {
    app: path.resolve(__dirname, './src/main.js')
  },
  proxy: {
    api: ['/api', '/test'],
    target: 'http://localhost:3000'
  },
  port: 8090,
  isAnalyzer: true,
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  srcPath: baseDir,
  mode: 'production',  // production or development
  modules: '',
  env: 'prod' // prod or dev
};
webpackBuild(params);