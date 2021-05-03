/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const project = require('../project.config')

module.exports = {
    entry: {
        // react: ['react', 'react-dom', 'react-router', 'react-router-dom'],
        // vendor: ['react-redux', 'redux', 'redux-actions', 'react-loadable', 'axios'],
        // i18next: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'react-redux',
            'redux',
            'redux-actions',
            'react-loadable',
            'axios',
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector'
        ]
    },
    output: {
        filename: '[name].dll.[fullhash:5].js',
        library: '[name]_library',
        path: path.resolve(__dirname, '../dll')
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
        new webpack.DllPlugin({
            context: project.basePath,
            name: '[name]_library',
            path: path.resolve(__dirname, '../dll/[name].manifest.json')
        })
    ],
    mode: 'production'
}
