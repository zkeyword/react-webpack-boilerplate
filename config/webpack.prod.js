/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 自动生成html
const CompressionPlugin = require('compression-webpack-plugin') // 提供带 Content-Encoding 编码的压缩版的资源
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // 优化和压缩CSS资源的插件
const TerserPlugin = require('terser-webpack-plugin') // 优化和压缩JS资源的插件，以前叫ugly-wepack-plugin
const WebpackBuildNotifierPlugin = require('webpack-build-notifier') // 开启通知
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin') // 在html中自动引入资源
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    //打包优化配置
    optimization: {
        usedExports: true,
        sideEffects: false,
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: 'single',
        moduleIds: 'deterministic',
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                parallel: true
            }),
            new TerserPlugin({
                parallel: true, // 开启多进程并发执行
                extractComments: false
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, '../public/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        // 启动gzip
        new CompressionPlugin({
            test: /.js$/ // 还可以扩展其他文件类型
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
        new WebpackBuildNotifierPlugin({
            title: '爸爸，打包成功了',
            suppressSuccess: true // don't spam success notifications
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dll/react.manifest.json')
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dll/vendor.manifest.json')
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, '../dll/*.js')
        })
    ],
    performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    stats: 'normal' //标准输出
})
