// webpack configuration
const dependencies = ['webpack', 'path', 'copy-webpack-plugin', 'html-webpack-plugin', 'webpack-bundle-analyzer'];
const include = deps => deps.map(dep => require(dep));

// webpack config
module.exports = ((function(webpack, path, CopyPlugin, HtmlPlugin, Analyzer) {

  const resolve = directory => path.resolve(__dirname, directory)
  const config = {

    // mode: '<env>',

    entry: {
      app: resolve('src/bootstrap.js'),
      // offline: resolve('src/sw.js'),
      // push: resolve('src/firebase-messaging-sw.js'),
    },

    output: {
      path: resolve('public'),
      publicPath: '/',
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js'
    },

    resolve: {
      alias: {
        components: resolve('src/app/components/'),
        services: resolve('src/app/services/'),
        utils: resolve('src/app/utils/'),
      },
      extensions: ['*', '.js', '.jsx', ".ts", ".tsx"],
    },

    module: {

      rules: [
        {
          test: /\.tsx?$/,
          use: { loader: 'awesome-typescript-loader' }
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: ['transform-decorators-legacy', 'transform-class-properties'], // need to manually order plugins to verify certain module loading edge cases
              presets: ['babel-preset-latest']
            }
          },
        },
        {
          test: '/\.(html)$/',
          use: ['raw']
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|gltf|bin|glb|stl|trs)$/,
          use: ['file-loader']
        }
      ]
    },

    // How to define globals in ts https://mariusschulz.com/blog/declaring-global-variables-in-typescript
    // define in webpack https://webpack.js.org/plugins/define-plugin/
    plugins: [
      // inject app config here from config/<env>.json
      new webpack.ProvidePlugin({
        React: "React",
        react: "React",
        ReactDOM: "ReactDOM",
        'react-dom': "ReactDOM",
      }),
      new HtmlPlugin({ template: resolve('src/app/components/index.html'), inject: 'body' }),
    ],

  };

  return config;
})(...include(dependencies)));
