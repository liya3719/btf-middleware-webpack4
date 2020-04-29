const path = require('path');
const webpackBuild = require('../index');
const params = {
  entry: {
    app: path.resolve(__dirname, './src/main.js')
  },
  devServer: {
    port: 8080,
    proxy: {
      '/test': {
        target: 'http://localhost:3000',
      }
    }
  },
  isAnalyzer: false,
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  mode: 'production',  // production or development
  modules: '',
  env: 'prod' // prod or dev
};
webpackBuild(params);