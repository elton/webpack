const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //删除文件
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成新的html并把bundle文件注入其中

var getBaseConfig = require('./webpack.config.base');  //引入基础配置

module.exports = (env, argv) => {
  var config = getBaseConfig(env, argv);

  config.output.filename = '[name].[hash].js'

  //添加插件
  config.plugins = config.plugins.concat([
    new CleanWebpackPlugin(), // 删除 output.path 里的文件
    //webpack2的UglifyJsPlugin不再压缩loaders，通过以下设置来压缩loaders
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),    
    new HtmlWebpackPlugin({ //注意：生成的html中，css和js文件注入的路径是: output.publicPath + 文件名
        template: 'app/index.tmpl.html', //源文件
        filename: '../index.html',  //生成的html文件，路径相对于 output.path
    }),
  ]);

  return config;
}