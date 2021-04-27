/* eslint-disable @typescript-eslint/no-var-requires */
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const portfinder = require('portfinder')
const ip = require('ip')
const chalk = require('chalk')
const webpackConfig = require('../config/webpack.dev')

portfinder.getPort(
    {
        port: 8000,
        stopPort: 8888
    },
    (err, port) => {
        const server = new WebpackDevServer(
            Webpack(webpackConfig),
            Object.assign({}, webpackConfig.devServer, {
                open: true,
                compress: true,
                stats: 'minimal',
                hot: true,
                contentBase: 'public/static/'
            })
        )
        if (err) {
            console.error(chalk.red(err))
        }
        server.listen(port, 'localhost', async e => {
            if (err) {
                return console.error(chalk.red(e))
            }
            console.log(`Server started ! ${chalk.green('✓')}`)
            console.log('\nApp running at:\n')
            console.log(chalk.green(`- Local:   http://localhost:${port}`))
            console.log(chalk.green(`- Network: http://${ip.address()}:${port}\n`))
        })
    }
)
