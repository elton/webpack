/**
 * 开发模式对应的 webpack 配置。
 * 使用 node server.js 命令启用开发模式。
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')  //将打包后的bundle注入到html中，产生一个新的html

var ip = 'localhost';
var port = 3000;
//引入基础配置
var getBaseConfig = require('./webpack.config.base');

module.exports = (env, argv) => {
  var config = getBaseConfig(env, argv);

  //每个module会通过eval()来执行，并且生成一个DataUrl形式的SourceMap.
  config.devtool = "#eval-source-map";

  //修改入口
  config.entry.app = [
    'webpack-dev-server/client?http://' + ip + ':' + port,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch', // React组件热加载
    './app/main',
  ];

  config.devServer = {
    contentBase: './dist',
    hot: true,
    port: port,
    inline: true,
    headers: {"Access-Control-Allow-Origin":"*"},
    historyApiFallback: true,   //the index.html page will be served in place of any 404 responses.
  }

  config.output.publicPath = 'http://' + ip + ':' + port + '/';

  //添加插件
  config.plugins = config.plugins.concat([
    new webpack.NamedModulesPlugin(),   //当开启 HMR 的时候使用该插件会显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    //生成一个新的html，到webpack-dev-server服务器
    new HtmlWebpackPlugin({ //生成的html中，css和js文件注入的路径是: output.publicPath + 文件名
        hash: true,
        template: './app/index.tmpl.html',
        filename: 'index.html',  //生成的html，路径相对于 output.publicPath。默认为index.html
    })
  ]);

  return config;
}