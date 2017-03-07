import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import PurifyCssPlugin from 'purifycss-webpack'

export const devServer = ({ host, port }) => {
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host,
            port
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    }
};

export const minify = () => {
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

export const setFreeVariable = (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);
    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    }
};

export const extractBundle = bundles => {
    const entry = {};
    const names = [];
    bundles.forEach(function (bundle) {
        if (bundle.entries) {
            entry[bundle.name] = bundle.entries
        }
        names.push(bundle.name)
    });

    return {
        entry,
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names
            })
        ]
    }
};

export const setupStyle = (paths, globals, theme) => {
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

export const extractStyle = (paths, globals, theme) => {
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

export const purifyCss = ({ paths, moduleExtensions }) => {
    return {
        plugins: [
            new PurifyCssPlugin({
                paths,
                moduleExtensions,
                minimize: true
            })
        ]
    }
};
