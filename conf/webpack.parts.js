const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCssPlugin = require('purifycss-webpack');

exports.devServer = function (options) {
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: options.host,
            port: options.port
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    }
};

exports.minify = function () {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true
                }
            })
        ]
    }
};

exports.setFreeVariable = function (key, value) {
    const env = {};
    env[key] = JSON.stringify(value);
    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    }
};

exports.extractBundle = function (bundles) {
    const entry = {};
    const names = [];
    bundles.forEach(function (bundle) {
        if (bundle.entries) {
            entry[bundle.name] = bundle.entries
        }
        names.push(bundle.name)
    });

    return {
        entry: entry,
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: names
            })
        ]
    }
};

exports.setupStyle = function (paths, globals, theme) {
    return {
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]--[local]-[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                modifyVars: theme
                            }
                        }
                    ],
                    include: paths,
                    exclude: globals
                },
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                modifyVars: theme
                            }
                        }
                    ],
                    include: globals
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]--[local]-[hash:base64:5]'
                            }
                        }
                    ],
                    include: paths,
                    exclude: globals
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                    include: globals
                }
            ]
        }
    }
};

exports.extractStyle = function (paths, globals, theme) {
    return {
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    localIdentName: '[name]--[local]-[hash:base64:5]'
                                }
                            },
                            {
                                loader: 'less-loader',
                                options: {
                                    modifyVars: theme
                                }
                            }
                        ]
                    }),
                    include: paths,
                    exclude: globals
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'less-loader',
                                options: {
                                    modifyVars: theme
                                }
                            }
                        ]
                    }),
                    include: globals
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    localIdentName: '[name]--[local]-[hash:base64:5]'

                                }
                            }
                        ]
                    }),
                    include: paths,
                    exclude: globals
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    }),
                    include: globals
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].[chunkhash].css')
        ]
    }
};

exports.purifyCss = function (options) {
    return {
        plugins: [
            new PurifyCssPlugin({
                paths: options.paths,
                moduleExtensions: options.moduleExtensions,
                minimize: true
            })
        ]
    }
};
