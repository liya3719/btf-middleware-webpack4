const chalk = require('chalk');
const webpack = require('webpack');
const express = require('express');
const history = require('connect-history-api-fallback');
const createProxyMiddleware = require('http-proxy-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackBaseConfig = require('./config/webpack.base.config');
const app = express();
module.exports = function(params) {
    const baseConfig = webpackBaseConfig(params);
    const compiler = webpack(baseConfig);
    if(params.mode === 'development') {
      const proxy = createProxyMiddleware(params.proxy.api, {
        target: params.proxy.target,
        ws: true,
        changeOrigin: true,
      });
      const devMiddleware = webpackDevMiddleware(compiler, {
        publicPath: baseConfig.output.publicPath,
        hot: true,
        stats: {
          chunk: false,
          colors: true
        }
      });
      const hotMiddleware = webpackHotMiddleware(compiler, {
        log: false,
        heartbeat: 2000,
      });
      app.use(history());
      app.use(devMiddleware);
      app.use(hotMiddleware);
      app.use(proxy);
      app.listen(params.port, () => {
        console.log(`服务启动地址, http://localhost:${params.port}`);
      })
    } else {
      webpack(baseConfig, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        };
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false, // if you are using ts-loader, setting this to true will make tyescript errors show up during build
          chunks: false,
          chunkModules: false
        }) + '\n\n')
        if (stats.hasErrors()) {
          console.log(chalk.red('  Build failed with errors.\n'))
          process.exit(1)
        }
        console.log(chalk.cyan('  Build complete.\n'))
      });
    }
}
