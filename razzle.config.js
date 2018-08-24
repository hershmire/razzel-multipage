const fs = require('fs');
const path = require('path');
const { getClientEnv } = require('razzle/config/env');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    // const dotenv = getClientEnv(target, { clearConsole, host, port });
    // const polyfills = require.resolve('razzle/polyfills');

    if (target === 'web') {
      if (dev) {
        config.output.filename = 'static/js/[name].js';
        config.entry = {
          home: [
            // We ship a few polyfills by default but only include them if React is being placed in
            // the default path. If you are doing some vendor bundling, you'll need to require the razzle/polyfills
            // on your own.
            // !dotenv.raw.REACT_BUNDLE_PATH && polyfills,
            require.resolve('razzle-dev-utils/webpackHotDevClient'),
            resolveApp('src/pages/home/home-client'),
          ].filter(Boolean),
          about: [
            // !dotenv.raw.REACT_BUNDLE_PATH && polyfills,
            require.resolve('razzle-dev-utils/webpackHotDevClient'),
            resolveApp('src/pages/about/about-client'),
          ].filter(Boolean),
        }
        config.optimization = {
          // @todo automatic vendor bundle
          // Automatically split vendor and commons
          // https://twitter.com/wSokra/status/969633336732905474
          // splitChunks: {
          //   chunks: 'all',
          // },
          // Keep the runtime chunk seperated to enable long term caching
          // https://twitter.com/wSokra/status/969679223278505985
          // runtimeChunk: true,
        };
      } else {
        config.output.filename = 'static/js/[name].[chunkhash:8].js';
        config.entry = {
          home: [
            // !dotenv.raw.REACT_BUNDLE_PATH && polyfills,
            resolveApp('src/pages/home/home-client'),
          ].filter(Boolean),
          about: [
            // !dotenv.raw.REACT_BUNDLE_PATH && polyfills,
            resolveApp('src/pages/about/about-client'),
          ].filter(Boolean),
        }

        config.optimization = {
          ...config.optimization,
          noEmitOnErrors: true,
          // @todo automatic vendor bundle
          // Automatically split vendor and commons
          // https://twitter.com/wSokra/status/969633336732905474
          splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
              commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'common',
                chunks: 'all',
              },
              main: {
                chunks: 'all',
                minChunks: 2,
                reuseExistingChunk: true,
                enforce: true,
              },
            },
          },
          // Keep the runtime chunk seperated to enable long term caching
          // https://twitter.com/wSokra/status/969679223278505985
          runtimeChunk: true,
        };
      }
      // console.log('XXX config:', config);
    }
    return config;
  },
};
