/**
 * Created by lijunbo on 2016/11/6.
 */

var webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: './bin',
        filename: 'app.bundle.js'
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
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ]
};
