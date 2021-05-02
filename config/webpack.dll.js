/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry: {
        react: ['react', 'react-dom', 'react-router-dom'],
        vendor: ['react-redux', 'redux', 'redux-actions', 'react-loadable', 'axios']
    },
    output: {
        filename: '[name].dll.[fullhash:5].js',
        library: '[name]_[fullhash:5]',
        path: path.resolve(__dirname, '../dll')
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
        new webpack.DllPlugin({
            context: __dirname,
            name: '[name]_[hash]',
            path: path.resolve(__dirname, '../dll/[name].manifest.json')
        })
    ],
    mode: 'production'
}
