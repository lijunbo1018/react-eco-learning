const path = require('path');
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
        app: PATHS.src
    },
    output: {
        path: PATHS.bin,
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            include: PATHS.src,
            loader: 'babel',
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
        new HtmlWebpackPlugin({
            title: 'Webpack Explore'
        })
    ]
};

var config;

switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(
            common,
            {
                devtool: 'source-map'
            },
            conf.setFreeVariable('process.env.NODE_ENV', 'production'),
            conf.extractBundle({
                name: 'vendor',
                entries: ['react', 'react-dom']
            }),
            conf.minify()
        );
        break;
    default:
        config = merge(
            common,
            {
                devtool: 'eval-source-map'
            },
            conf.devServer({
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

module.exports = validate(config);

