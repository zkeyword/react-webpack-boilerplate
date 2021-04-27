/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const chalk = require('chalk')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin') // 引入另一个tsconfig.json文件，该文件使用esnext的模块方式。
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css的 这样就可以把js和css分开，然后在加载的时候 并行加载
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const project = require('../project.config')
const isProduction = process.env.NODE_ENV === 'production'
const SRC_DIR = path.join(project.basePath, project.srcDir)

const cssLoader = (type = 'css', options = {}, global) => {
    const typeReg = {
        css: /\.css$/,
        stylus: /\.(styl|stylus)$/,
        less: /\.less$/,
        sass: /\.(sass|scss)$/
    }
    const typeModuleReg = {
        css: /\.module\.css$/,
        stylus: /\.module\.(styl|stylus)$/,
        less: /\.module\.less$/,
        sass: /\.module\.(sass|scss)$/
    }
    const preParseLoader = [
        {
            loader: `${type}-loader`,
            options
        }
    ]
    const globalLoader = global
        ? [
              {
                  loader: 'style-resources-loader', // (TODO: 验证一下)，此处为了公共的sass\less样式能够全局加载，而不用每个组件都单独引用。
                  options: {
                      patterns: path.resolve(project.basePath, global)
                  }
              }
          ]
        : []
    const miniCss = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: project.publicPath // 多加目录的话，待 CDN 部署时测试
            }
        }
    ]
    const loader = [
        {
            test: typeModuleReg[type],
            use: [
                ...(isProduction
                    ? miniCss
                    : [
                          {
                              loader: 'style-loader'
                          }
                      ]),
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: {
                            getLocalIdent: getCSSModuleLocalIdent
                        }
                    }
                },
                {
                    loader: 'postcss-loader'
                },
                ...(type === 'css' ? [] : preParseLoader),
                ...(type === 'css' || type === 'stylus' ? [] : globalLoader)
            ]
        },
        {
            test: typeReg[type],
            exclude: typeModuleReg[type],
            use: [
                ...(isProduction
                    ? miniCss
                    : [
                          {
                              loader: 'style-loader'
                          }
                      ]),
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader'
                },
                ...(type === 'css' ? [] : preParseLoader),
                ...(type === 'css' || type === 'stylus' ? [] : globalLoader)
            ]
        }
    ]
    return loader
}

module.exports = {
    entry: {
        main: [SRC_DIR]
    },
    context: process.cwd(),
    output: {
        path: path.resolve(project.basePath, project.outDir),
        publicPath: project.publicPath,
        filename: 'js/bundle.[contenthash].js',
        chunkFilename: 'js/chunk.[chunkhash].js',
        assetModuleFilename: 'asset/[hash][ext][query]'
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
            {
                test: /\.(gif|png|jpe?g|svg|webp)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2?)$/,
                type: 'asset/resource'
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
            })
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
        new MiniCssExtractPlugin({
            filename: 'css/[name].[fullhash].css',
            chunkFilename: 'css/[name].[fullhash].css',
            ignoreOrder: true // 忽略有关顺序冲突的警告
        }),
        new ProgressBarPlugin({
            format: `${chalk.green.bold('build[:bar]')}${chalk.green.bold(':percent')}(:elapsed seconds)`,
            clear: false,
            width: 60
        })
    ]
}
