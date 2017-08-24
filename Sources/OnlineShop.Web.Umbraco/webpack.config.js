'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'babel-polyfill',
        './wwwroot/app/index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'wwwroot/dist/'),
        filename: 'bundle.js',
        publicPath: '/wwwroot/dist/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint',
                include: [
                    path.resolve(__dirname, "wwwroot/app")
                ]
            }
        ],
        loaders: [
            {
                loader: 'babel',
                include: [
                    path.resolve(__dirname, "wwwroot/app")
                ],
                test: /\.jsx?$/,
                query: {
                    presets: ['stage-0', 'es2015', 'react']
                }
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    }
};