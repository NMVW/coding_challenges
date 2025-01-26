// webpack configuration
const dependencies = ['webpack', 'path', 'copy-webpack-plugin', 'html-webpack-plugin', 'webpack-bundle-analyzer'];
const include = deps => deps.map(dep => require(dep));

// webpack config
module.exports = env => ((function(env={mode: 'development'}, webpack, path, CopyPlugin, HtmlPlugin, Analyzer) {

  const resolve = directory => path.resolve(__dirname, directory);
  const config = {

    mode: env.mode,

    entry: {
      app: resolve('src/index.js'),
    },

    output: {
      path: resolve('dist'),
      publicPath: '/',
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js'
    },

    resolve: {
      alias: {
        client_config: resolve('config/got.json'),
        components: resolve('src/components/'),
        services: resolve('src/services/'),
        assets: resolve('src/assets/'),
      },
      extensions: ['*', '.js', '.jsx'],
    },

    module: {

      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: ['transform-class-properties']
            }
          },
        },
        {
          test: '/\.(html)$/',
          use: ['raw']
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: ['file-loader']
        }
      ]
    },

    plugins: [
      new webpack.ProvidePlugin({ CLIENT_CONFIG: 'client_config' }),
      new CopyPlugin([{ from: 'src/favicon.png', to: 'dist'}]), // copy top-level independent favicon to served dist/
      new HtmlPlugin({ template: resolve('src/index.html'), inject: 'body' }),
    ],
  };

  if (env.mode === 'development') {
    config.plugins.push(new Analyzer.BundleAnalyzerPlugin({ analyzerPort: 9090 })); // visual bundle size

    config.devtool = 'inline-source-map';

    config.devServer = {
      contentBase: resolve('dist'),
      compress: true,
      allowedHosts: ['localhost'],
      port: 3333,
      historyApiFallback: true,
      stats: {
        modules: false,
        cached: false,
        colors: true,
        chunk: false
      }
    };
  }

  console.log('WEBPACK CONFIG', config)

  return config;
})(env, ...include(dependencies)));