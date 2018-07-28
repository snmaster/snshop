require("babel-register");
require("babel-polyfill");
var WebpackDevServer =  require("webpack-dev-server");
var webpack =require ('webpack');
var webpackConfig= require('./webpack.dev');
const proxyPort = 3230;
webpackConfig.output.path="/public";
    const server = new WebpackDevServer(webpack(webpackConfig), {
        contentBase: __dirname,
        hot: true,
        quiet: false,
        noInfo: false,
        publicPath:"/public/",
        stats: { colors: true }
    });
// run the two servers
server.listen(proxyPort, "localhost", function() {
    console.log(`Proxy server is running on port ${proxyPort}`);
});