const { merge } = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin")
const project = require('../project.config')

const common = require('./webpack.common')

module.exports = merge(common, {
    mode: "development",
    devtool: 'inline-source-map',
    target: "web",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(project.basePath, './public/index.html'),
        }),
        ...(project.eslint ?
            new ESLintPlugin({
                fix: true, // 启用ESLint自动修复功能
                extensions: ['js', 'jsx', 'tsx', 'ts'],
                context: path.resolve(project.basePath, './'), // 文件根目录
                exclude: '/node_modules/',// 指定要排除的文件/目录
                cache: true, //缓存
            }) : [])
    ],
    stats: "errors-only", //只在发生错误或有新的编译时输出
});