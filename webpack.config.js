const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // development 或 production

    entry: [
        'react-hot-loader/patch', // React组件热加载
        __dirname + "/app/main.js" //入口文件，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
    ], 
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    // “__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。

    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot:true
    },
    module: {
        rules: [{
            test: /(.jsx|\.js)$/,
            use: {
                loader: 'babel-loader'
            },
            exclude: /node_modules/
        },{
                test: /(\.css|\.scss)$/i,
                use: [{
                    loader:"style-loader" // 将 JS 字符串生成为 style 节点
                },{
                    loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
                    options: {
                        importLoaders: 1,
                        // 0 => no loaders (default);
                        // 1 => postcss-loader;
                        modules: {
                            localIdentName: '[path][name]__[local]--[hash:base64:5]' //use '[path][name]__[local]' for development, use '[hash:base64]' for production
                        }
                    }
                },{
                  loader: 'postcss-loader' // 处理scss之类的文件
                }]
        }]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: 'Copyright 2020 Elton Zheng'
        }),
        new HtmlWebpackPlugin({
            title: 'My App',
            template: __dirname + '/app/index.tmpl.html',
            filename: __dirname + '/dist/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件        
    ]
}