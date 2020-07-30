const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        bundle: ['babel-polyfill', './src/index.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html', minify: true }),
    ],
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
};