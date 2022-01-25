/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css的 这样就可以把js和css分开，然后在加载的时候 并行加载
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const project = require('../../project.config')
const isProduction = process.env.NODE_ENV === 'production'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
exports.cssLoader = (type = 'css', options = {}, global) => {
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
