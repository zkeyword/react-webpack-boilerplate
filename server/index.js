/* eslint-disable @typescript-eslint/no-var-requires */
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const portfinder = require('portfinder')
const ip = require('ip')
const chalk = require('chalk')
const webpackConfig = require('../config/webpack.dev')
const projectConfig = require('../project.config')

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
                noInfo: true,
                compress: true,
                stats: 'minimal',
                hot: true,
                contentBase: 'public/static/',
                ...projectConfig.proxy
            })
        )
        if (err) {
            console.error(chalk.red(err))
        }
        server.listen(port, 'localhost', async e => {
            if (err) {
                return console.error(chalk.red(e))
            }
            console.log(`\n\nServer started ! ${chalk.green('✓')}`)
            console.log('\nApp running at:\n')
            console.log(chalk.green(`- Local:   http://localhost:${port}`))
            console.log(chalk.green(`- Network: http://${ip.address()}:${port}\n`))
            console.log('Use Ctrl+C to close it\n')
        })
    }
)
