const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
    src: path.join(__dirname, "../src"),
    dist: path.join(__dirname, "../dist"),
    assets: "assets"
};

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}/js/[name].js`,
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(gif|png|jpg|svg)$/,
                loader: 'file-loader',
                options: {
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: { path: `${PATHS.src}/js/postcss.config.js` }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}/css/[name].css`
        }),
        new HTMLWebpackPlugin({
            hash: false,
            title: 'index.html',
            template: `${PATHS.src}/index.pug`,
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/img`, to: `${PATHS.assets}/img` },
            { from: `${PATHS.src}/static` }
        ])
    ]
}