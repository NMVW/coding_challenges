// webpack configuration
const dependencies = ['./webpack.common.js', 'webpack', 'path', 'copy-webpack-plugin', 'html-webpack-plugin', 'webpack-bundle-analyzer'];
const include = deps => deps.map(dep => require(dep));

// webpack config
module.exports = env => ((function(commonConfig, webpack, path, CopyPlugin, HtmlPlugin, Analyzer) {

  const resolve = directory => path.resolve(__dirname, directory)

  const devServerConfig = {
    hot: true,
    contentBase: resolve('public'),
    compress: true,
    allowedHosts: ['localhost'],
    port: 3210,
    historyApiFallback: true,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    },
  };

  const appConfig = require(`./.env.${env.isStaging ? 'dev': 'prod'}.json`);
  const firebaseConfig = appConfig.firebase;
  const emulatorsConfig = require('../firebase.json').emulators;

  const processEnv = { ...process.env, app: { ...appConfig, firebase: { ...firebaseConfig, emulators: emulatorsConfig }, shouldEmulate: env.shouldEmulate } };

  const config = {
    ...commonConfig,
    mode: `${env.isStaging ? 'development': 'production'}`,
    plugins: [
      ...commonConfig.plugins,
      new webpack.DefinePlugin({ 'process.env': JSON.stringify(processEnv) }),
      new CopyPlugin([
        { from: 'src/favicon.png', to: '../public'}, // copy top-level independent favicon to served public/
        { from: 'src/small_icon.png', to: '../public' },
        { from: 'src/large_icon.png', to: '../public' },
        // { from: 'src/manifest.json', to: '../public/manifest.json', transform: transformManifest(appConfig.app.manifest) },
      ]),
      new Analyzer.BundleAnalyzerPlugin({ analyzerPort: 9124 }), // bundle chunks visualizer
    ],
  };

  // webpack dev server local dev configs
  if (env.run === true) {
    config.devServer = devServerConfig;
    config.entry['hot-module'] = 'react-hot-loader/patch';
    config.plugins.push(...[new webpack.HotModuleReplacementPlugin()]);
    config.devtool = 'inline-source-map';
  }

  console.log(`${env.isStaging ? 'DEV' : 'PROD'} WEBPACK CONFIG`, config);
  return config;

})(...include(dependencies)));

function transformManifest(envManifest) {

  return (manifestBuffer, filePath) => {

    const manifest = JSON.parse(manifestBuffer.toString());

    manifest.start_url = './index.html' || envManifest.start_url;

    return JSON.stringify(manifest, null, 2);

  }

}
