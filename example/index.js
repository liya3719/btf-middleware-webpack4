const path = require('path');
const baseDir = process.cwd();
const webpackBuild = require('../index');
const mode = process.env.NODE_ENV;
const env = mode === 'development' ? 'dev' : 'prod';
function resolve (dir) {
  return path.join(__dirname, dir)
}
const params = {
  isMulti: false,
  entry: {
    app: path.resolve(__dirname, './src/main.js')
  },
  proxy: {
    api: ['/api', '/test'],
    target: 'http://localhost:3000'
  },
  path: resolve('dist/static'),
  publicPath: 'dist/static',
  port: 8090,
  isAnalyzer: false,
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  srcPath: baseDir,
  mode: mode,  // production or development
  modules: '',
  env: env // prod or dev
};
webpackBuild(params);