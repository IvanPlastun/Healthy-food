const merge = require('webpack-merge')
const BaseWebpackConfig = require('./webpack.base.conf')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BuildWebpackConfig = merge(BaseWebpackConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin()
    ]
})

module.exports = new Promise((resolve, reject) => {
    resolve(BuildWebpackConfig)
})