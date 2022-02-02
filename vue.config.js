const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').
    BundleAnalyzerPlugin

module.exports = {
    devServer: {
        disableHostCheck: true
    },
    productionSourceMap: false,
    configureWebpack: {
    	mode: 'production',
        plugins: [new BundleAnalyzerPlugin()]
    }
}