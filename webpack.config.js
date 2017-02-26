const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const merge = require('webpack-merge');
const glob = require('glob');

const parts = require('./conf/webpack.parts');
const pkg = require('./package.json');

const PATHS = {
    src: path.join(__dirname, 'src'),
    style: path.join(__dirname, 'src/common', 'style.less'),
    fonts: path.join(__dirname, 'src/common/anticon'),
    output: path.join(__dirname, 'output')
};

const GLOBAL_STYLES = [
    path.join(__dirname, 'src/common'),
    path.join(__dirname, 'node_modules', 'antd'),
    path.join(__dirname, 'node_modules', 'codemirror')
];

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
                presets: [
                    ['es2015', { modules: false } ],
                    'react'
                ],
                plugins: [
                    ['import', { libraryName: 'antd', style: true }]
                ]
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
            test: /\.(ttf|eot|svg)$/,
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

var generateConfig;

var lifecycle = process.env.npm_lifecycle_event || '';
switch (lifecycle.split(':')[0]) {
    case 'build':
    case 'stats':
        generateConfig = function () {
            const dependencies = Object.keys(pkg.dependencies).filter(dep => dep !== 'antd' && dep !== 'codemirror');
            return merge(
                common,
                {
                    devtool: 'source-map',
                    output: {
                        path: PATHS.output,
                        filename: '[name].[chunkhash].js',
                        chunkFilename: '[chunkhash].js'
                    }
                },
                parts.extractBundle([
                    {
                        name: 'vendor1',
                        entries: dependencies.filter(dep => dep.indexOf('codemirror') >= 0 || dep.indexOf('react') < 0)
                    },
                    {
                        name: 'vendor2',
                        entries: dependencies.filter(dep => dep.indexOf('codemirror') < 0 && dep.indexOf('react') >= 0)
                    },
                    {
                        name: 'manifest'
                    }
                ]),
                parts.minify(),
                parts.extractStyle(PATHS.src, GLOBAL_STYLES, theme),
                parts.purifyCss({
                    paths: glob.sync(path.join(PATHS.src, '**', '*.less')),
                    moduleExtensions: ['.js', '.html']
                })
            );
        };
        break;
    case 'debug':
        generateConfig = function () {
            return merge(
                common,
                parts.setupStyle(PATHS.src, GLOBAL_STYLES, theme),
                {
                    plugins: [
                        new LiveReloadPlugin({
                            port: process.env.PORT || 8080,
                            appendScriptTag: true
                        })
                    ]
                }
            );
        };
        break;
    default:
        generateConfig = function () {
            return merge(
                common,
                {
                    devtool: 'eval-source-map'
                },
                parts.setupStyle(PATHS.src, GLOBAL_STYLES, theme),
                parts.devServer({
                    host: process.env.HOST,
                    port: process.env.PORT
                })
            );
        };
}

module.exports = function (env) {
    env = env || {};
    return merge(
        generateConfig(),
        parts.setFreeVariable('process.env.VERSION', env.target)
    );
};

