import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import LiveReloadPlugin from 'webpack-livereload-plugin'
import merge from 'webpack-merge'
import glob from 'glob'

import * as parts from './conf/webpack.parts'
import pkg from './package.json'

const PATHS = {
    src: path.join(__dirname, 'src'),
    fonts: path.join(__dirname, 'src/common/anticon'),
    output: path.join(__dirname, 'output')
};

const GLOBAL_STYLES = [
    path.join(__dirname, 'src/common'),
    path.join(__dirname, 'node_modules', 'antd')
];

let theme = {};
if (typeof pkg.theme === 'string' && pkg.theme.charAt(0) === '.') {
    theme = require(pkg.theme)
}

const common = {
    entry: {
        app: PATHS.src
    },
    output: {
        path: PATHS.output,
        publicPath: '/',
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
                    ['import', { libraryName: 'antd', style: true }],
                    'transform-class-properties'
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
            title: '深入React技术栈'
        })
    ]
};

let generateConfig;

const lifecycle = process.env.npm_lifecycle_event || '';
switch (lifecycle.split(':')[0]) {
    case 'build':
    case 'stats':
        generateConfig = () => {
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
                        name: 'vendor',
                        entries: Object.keys(pkg.dependencies).filter(dep => dep !== 'antd')
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
        generateConfig = () => merge(
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
        break;
    default:
        generateConfig = () => merge(
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
}

export default generateConfig

