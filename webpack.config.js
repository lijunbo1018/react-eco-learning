const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    bin: path.join(__dirname, 'bin')
};

module.exports = {
    entry: {
        app: PATHS.src,
        vendor: ['react', 'react-dom']
    },
    output: {
        path: PATHS.bin,
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            loader: 'style!css!less'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new HtmlWebpackPlugin({
            title: 'Webpack Explore'
        })
    ]
};
