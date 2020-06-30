module.exports = {
    mode: 'development', // development 或 production
    
    entry: __dirname + "/app/main.js", //入口文件，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },

    devtool:'eval-source-map',
    devServer: {
        contentBase: './public',
        historyApiFallback: true, //不跳转
        inline: true //实时刷新
    },
    module: {
        rules: [{
            test: /(.jsx|\.js)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        "@babel/preset-env","@babel/preset-react"
                    ]
                }
            },
            exclude:/node_modules/
        }]
    }
}

// “__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。