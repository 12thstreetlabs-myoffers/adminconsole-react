const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (env) => merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: [path.join(__dirname, 'build'), path.join(__dirname, 'public')],
        host: '127.0.0.1',
        port: 8000,
        hot: true,
        disableHostCheck: true,
        proxy: {
            '/superAdmin': {
                target: 'http://localhost:3001',
                secure: false,
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/i,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            ENVIRONMENT: JSON.stringify(env)
        })
    ]
});