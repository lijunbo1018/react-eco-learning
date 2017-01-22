const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const conf = require('./conf/config');

const PATHS = {
    src: path.join(__dirname, 'src'),
    style: path.join(__dirname, 'src/common', 'style.less'),
    output: path.join(__dirname, 'output')
};

const common = {
    entry: {
        app: PATHS.src,
        style: PATHS.style
    },
    output: {
        path: PATHS.output,
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            include: PATHS.src,
            loader: 'babel',
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.(jpg|png)$/,
            loader: 'url?limit=25000',
            include: PATHS.img
        }, {
            test: /\.svg$/,
            loader: 'file',
            include: PATHS.img
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
    case 'stats':
        config = merge(
            common,
            {
                devtool: 'source-map',
                output: {
                    path: PATHS.output,
                    filename: '[name].[chunkhash].js',
                    chunkFilename: '[chunkhash].js'
                }
            },
            conf.setFreeVariable('process.env.NODE_ENV', 'production'),
            conf.extractBundle({
                name: 'vendor',
                entries: ['react', 'react-dom']
            }),
            conf.minify(),
            conf.extractStyle(PATHS.style),
            conf.purifyStyle([PATHS.src])
        );
        break;
    default:
        config = merge(
            common,
            {
                devtool: 'eval-source-map'
            },
            conf.setupStyle(PATHS.style),
            conf.devServer({
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

module.exports = validate(config, {
    quiet: true
});

