const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = (env) => merge.strategy({ plugins: 'append', output: 'replace' })(common, {
    mode: 'production',
    output: {
        filename: 'static/js/[name].[hash].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                exclude: /\.module\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'resolve-url-loader',
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
            {
                test: /\.module\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        },
                    },
                    'resolve-url-loader',
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/i,
                use: [
                   {
                       loader: 'file-loader',
                       options: {
                           outputPath: 'data/images',
                       }
                   }
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
        new CleanWebpackPlugin(['build']),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[hash].css',
        }),
        // new CopyWebpackPlugin([
        //     { from: 'public' },
        // ]),
        new webpack.DefinePlugin({
            ENVIRONMENT: JSON.stringify(env),
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: 4,
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
});
