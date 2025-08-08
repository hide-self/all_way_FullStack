const {resolve}=require("path")

const HtmlWebpackPlugin=require("html-webpack-plugin")

const MiniCssExtractPlugin=require("mini-css-extract-plugin")

module.exports = {
    entry:{
        first:["./src/index.js","./src/B.js"],
        second:"./src/enterA.js"
    },

    output: {
        filename: '[name].js',
        path:resolve(__dirname,'build') 
    },

    module: {
        rules: [
            {test:/\.css$/,use:[MiniCssExtractPlugin.loader,'css-loader']},
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template:"./src/test.html",
            filename:"webpackdemo.html",
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }

        }),
        new HtmlWebpackPlugin({
            template:"./src/test2.html",
            filename:"webpackdemo2.html",
            minify:{
                collapseWhitespace:true,
                removeComments:true
            },
            chunks:['first']
        }),
        new MiniCssExtractPlugin()
    ],

    mode:'production',

    // webpack服务器配置
    devServer:{
        port:5500,  //服务器端口号
        compress:true   //是否压缩
    }

};