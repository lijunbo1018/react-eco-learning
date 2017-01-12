const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const conf = require('./conf/config');

const PATHS = {
    src: path.join(__dirname, 'src'),
    bin: path.join(__dirname, 'bin')
};

const common = {
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
            include: PATHS.src,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.less$/,
            include: PATHS.src,
            loaders: ['style', 'css', 'less']
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new HtmlWebpackPlugin({
            title: 'Webpack Explore'
        })
    ]
};

var config;

switch (process.env.npm_lifecyle_event) {
    case 'build':
        config = merge(
            common,
            {}
        );
        break;
    default:
        config = merge(
            common,
            conf.devServer({
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

module.exports = validate(config);

