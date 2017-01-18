const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const conf = require('./conf/config');

const PATHS = {
    src: path.join(__dirname, 'src'),
    img: path.join(__dirname, 'img'),
    style: [
        path.join(__dirname, 'node_modules', 'purecss'),
        path.join(__dirname, 'src', 'style.less')
    ],
    bin: path.join(__dirname, 'bin')
};

const common = {
    entry: {
        app: PATHS.src,
        style: PATHS.style
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
                    path: PATHS.bin,
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
            conf.setupCss(PATHS.style),
            conf.devServer({
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

module.exports = validate(config, {
    quiet: true
});

