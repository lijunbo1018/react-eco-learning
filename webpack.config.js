const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const merge = require('webpack-merge');

const conf = require('./conf/config');
const pkg = require('./package.json');

const PATHS = {
    src: path.join(__dirname, 'src'),
    style: path.join(__dirname, 'src/common', 'style.less'),
    fonts: path.join(__dirname, 'src/common/anticon'),
    output: path.join(__dirname, 'output')
};

var theme = {};
if (typeof pkg.theme === 'string' && pkg.theme.charAt(0) === '.') {
    theme = require(pkg.theme)
}

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
        rules: [{
            test: /\.js$/,
            include: PATHS.src,
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                presets: ['es2015', 'react'],
                plugins: [['import', { libraryName: 'antd', style: true }]]
            }
        }, {
            test: /\.(jpg|png)$/,
            loader: 'url-loader?limit=25000',
            include: PATHS.img
        }, {
            test: /\.svg$/,
            loader: 'file-loader',
            include: PATHS.img,
            exclude: PATHS.fonts
        }, {
            test: /\.woff$/,
            loader: 'url-loader',
            options: {
                name: 'font/[name].[ext]',
                limit: 5000,
                mimetype: 'application/font-woff'
            },
            include: PATHS.fonts
        }, {
            test: /\.ttf$|\.eot$|\.svg$/,
            loader: 'file-loader',
            options: {
                name: 'font/[name].[ext]'
            },
            include: PATHS.fonts
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack示例项目'
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
            conf.setFreeVariable('process.env.VERSION', 'xiaolvyun'),
            conf.extractBundle({
                name: 'vendor',
                entries: Object.keys(pkg.dependencies).filter(dep => dep !== 'antd' && dep !== 'codemirror')
            }),
            conf.minify(),
            conf.extractStyle([
                PATHS.src,
                path.join(__dirname, 'node_modules', 'antd'),
                path.join(__dirname, 'node_modules', 'codemirror')
            ], theme)
        );
        break;
    case 'debug':
        config = merge(
            common,
            conf.setFreeVariable('process.env.VERSION', 'icode'),
            conf.setupStyle([
                PATHS.src,
                path.join(__dirname, 'node_modules', 'antd'),
                path.join(__dirname, 'node_modules', 'codemirror')
            ], theme),
            {
                plugins: [
                    new LiveReloadPlugin({
                        port: 8080,
                        appendScriptTag: true
                    })
                ]
            }
        );
        break;
    default:
        config = merge(
            common,
            {
                devtool: 'eval-source-map'
            },
            conf.setFreeVariable('process.env.VERSION', 'icode'),
            conf.setupStyle([
                PATHS.src,
                path.join(__dirname, 'node_modules', 'antd'),
                path.join(__dirname, 'node_modules', 'codemirror')
            ], theme),
            conf.devServer({
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

module.exports = config;

