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
    //chainWebpack(config, {webpack}) {
    //    config.plugin('HTMLWebpackPlugin').use(new HTMLWebpackPlugin());
    //    console.log(config.loader);
    //},
};
