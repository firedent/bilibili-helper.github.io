/**
 * Author: DrowsyFlesh
 * Create: 2019/3/3
 * Description:
 */
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

export default {
    define: {
        local: true,
    },
    chainWebpack: function(config, {webpack}) {
        config.merge({
            optimization: {
                nodeEnv: 'development',
                minimize: false,
                splitChunks: {
                    minChunks: 2,
                    cacheGroups: {
                        //pinball: {
                        //    name: 'pinball',
                        //    test: /[\\/]Pinball\/game[\\/]/,
                        //    chunks: 'async',
                        //    minChunks: 1,
                        //},
                        vendors: {
                            name: 'vendors',
                            test: '/(node_modules)/',
                            chunks: 'all',
                            minChunks: 1,
                        },
                    },
                },
            },
        });
    },
    //chainWebpack(config, {webpack}) {
    //    config.plugin('HTMLWebpackPlugin').use(new HTMLWebpackPlugin());
    //    console.log(config.loader);
    //},
};
