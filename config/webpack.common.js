/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const chalk = require('chalk')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin') // 引入另一个tsconfig.json文件，该文件使用esnext的模块方式。
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { cssLoader } = require('./utils/cssLoader')
const project = require('../project.config')
const SRC_DIR = path.join(project.basePath, project.srcDir)

module.exports = {
    entry: {
        main: [SRC_DIR]
    },
    context: process.cwd(),
    output: {
        path: path.resolve(project.basePath, project.outDir),
        publicPath: project.publicPath,
        filename: 'js/[name].[contenthash:5].js',
        chunkFilename: 'js/[name].[chunkhash:5].js',
        assetModuleFilename: 'asset/[name].[hash:5][ext][query]'
    },
    cache: {
        type: 'memory' //使用持久化缓存 memory:使用内存缓存 filesystem：使用文件缓存
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            ...cssLoader(),
            ...cssLoader('less', {
                lessOptions: {
                    javascriptEnabled: true
                }
            }),
            ...cssLoader('stylus', {
                webpackImporter: false,
                stylusOptions: {
                    import: [path.resolve(__dirname, '../src/assets/stylus/lib/mixin.styl')]
                }
            }),
            {
                test: /\.(eot|ttf|woff|woff2|svg?)$/,
                include: path.resolve(__dirname, '../src/assets/fonts'),
                type: 'asset/resource'
            },
            {
                test: /\.(gif|png|jpe?g|webp|svg|ico)$/i,
                include: [path.resolve(__dirname, '../src/app'), path.resolve(__dirname, '../src/assets/images')],
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                }
            },
            {
                test: /\.svg$/,
                include: path.resolve(__dirname, '../src/assets/icons'),
                use: [
                    { loader: 'svg-sprite-loader', options: {} },
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                {
                                    name: 'removeAttrs',
                                    params: { attrs: 'fill' }
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: [project.srcDir, 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '@': SRC_DIR
        },
        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.resolve(project.basePath, './tsconfig.json')
            })
        ]
    },
    devServer: {},
    plugins: [
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$|^\.\/lib\/chart\/(.)*/,
            contextRegExp: /moment$|echarts$/
        }),
        new LodashModuleReplacementPlugin(),
        new AntdDayjsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[fullhash].css',
            chunkFilename: 'css/[name].[fullhash].css',
            ignoreOrder: true // 忽略有关顺序冲突的警告
        }),
        new ProgressBarPlugin({
            format: `${chalk.green.bold('build[:bar]')} ${chalk.green.bold(':percent')} (:elapsed seconds)`,
            clear: false,
            width: 60
        })
    ]
}
