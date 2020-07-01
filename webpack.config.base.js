/**
 * webpack基础配置。
 * 在 webpack.config.dev.js 和 webpack.config.prod.js 文件中被引入。
 */
var path = require("path");
var webpack = require('webpack');
//引入样式抽离插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var config = {
  //基础目录，入口起点会相对于此目录查找
  context: __dirname,

  entry: {
    // Add as many entry points as you have container-react-components here
    // 多入口，自己的js和第三方的插件放在不同的js中。
    app: './app/main', // js后缀名可以省略
    vendors: ['react']  //指定第三方插件打包到 vendors.js 中
  },

  output: {
    //打包文件输出目录
    path: path.resolve('./dist/bundles/'),
    filename: "[name].js",
    chunkFilename: "[name].bundle.js",
    //访问静态资源的基础路径
    publicPath: './bundles/'
  },

  externals: [
  ], // add all vendor libs

  optimization: {
    splitChunks: {
      minChunks: 2, //Minimum number of chunks that must share a module before splitting.
      cacheGroups: {
        commons: {
          name:"commons",
        },
      }
    }
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'Copyright (c) Elton Zheng. \nThis source code is licensed under the MIT license found in the \nLICENSE file in the root directory of this source tree.'
    }),
  ], // add all common plugins here

  module: {
    rules:[
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        test: /\.(gif|png|jpg|webp)$/,
        use: 'url-loader?limit=8192'
      },
      // the url-loader uses DataUrls. url-loader封装了file-loader。
      //小于(limit/1024)kb的woff/wpff2文件被编码成DataURL，并内联到代码中.
      //大于这个限制的文件会使用file-loader打包。通过http请求加载。
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=81920'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
    ] // add all common loaders here
  },

  resolve: {
    modules:['node_modules'],
    extensions: ['.js', '.jsx', '.css']
  }
};

module.exports = (env, argv) => {

  var devMode = argv.mode === 'development'   // whether is development mode

  config.plugins.push(
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[name].css' : '[name].[hash].css',
      // ignoreOrder: false, // Enable to remove warnings about conflicting order
    })
  )

  config.module.rules.push(
    {
      test: /\.css$/,
      use: [
        // 'style-loader', //creates style nodes from JS strings
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // only enable hot in development
            hmr: devMode,
            // if hmr does not work, this is a forceful method.
            reloadAll: true,
          },
        }, // 从js里面分离独立的css文件
        {
          loader: 'css-loader', options: {
            sourceMap: devMode,
            importLoaders: 1,
            // 0 => no loaders (default);
            // 1 => postcss-loader;
            modules: {
                localIdentName: devMode?'[path][name]__[local]':'[hash:base64]' // 自定义生成的类名 use '[path][name]__[local]' for development, use '[hash:base64]' for production
            }
          }
        }, // translates CSS into CommonJS
        { loader: 'postcss-loader', options: { sourceMap: devMode?'inline':false}}, // autoprefix and minify css
      ],
    },
    {
      test: /\.scss$/i,
      use: [
        // 'style-loader',  //creates style nodes from JS strings
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // only enable hot in development
            hmr: devMode,
            // if hmr does not work, this is a forceful method.
            reloadAll: true,
          },
        },// 从js里面分离独立的css文件
        {
          loader: 'css-loader', options: {
            sourceMap: devMode,
            importLoaders: 1,
            // 0 => no loaders (default);
            // 1 => postcss-loader;
            modules: {
              localIdentName: devMode ? '[path][name]__[local]' : '[hash:base64]' // 自定义生成的类名 use '[path][name]__[local]' for development, use '[hash:base64]' for production
            }
          }
        }, // 将 CSS 转化成 CommonJS 模块
        { loader: 'postcss-loader', options: { sourceMap: devMode ? 'inline' : false } },   // autoprefix and minify css
        { loader: "sass-loader", options: { sourceMap: devMode } } // 将 Sass 编译成 CSS
      ]
    }
  )

  return config;
};