const chalk = require('chalk');
const webpack = require('webpack');
const webpackBaseConfig = require('./config/webpack.base.config');
module.exports = function(params) {
    const baseConfig = webpackBaseConfig(params);
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