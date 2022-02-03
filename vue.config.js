module.exports = {
    devServer: {
        disableHostCheck: true,
        hot: false,
        liveReload: false
    },
    productionSourceMap: false,
    configureWebpack: {
    	mode: 'production'
    }
}