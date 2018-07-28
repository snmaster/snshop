var webpack = require('webpack');
module.exports = {
    entry: {
        admin: ['./client/admin/browser.js'],
        site:['./client/site/browser.js']
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loaders:['babel']
        }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    output: {
        path: './public',
        filename: '[name].bundle.test.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        })
    ],
    devtool: 'source-map'
};

