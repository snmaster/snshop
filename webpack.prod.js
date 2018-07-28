//var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
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
        },
        //{test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
        ]
    },
    resolve: {
        //root: path.resolve(__dirname, '.'),
        extensions: ['', '.js']
    },
    output: {
        path: './public/',
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            },
            comments: false,
            sourceMap: false
        }),
        new CompressionPlugin({   
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
        })
    ],
    //devtool: 'source-map'
};

``