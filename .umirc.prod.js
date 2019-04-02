/**
 * Author: DrowsyFlesh
 * Create: 2019/3/3
 * Description:
 */

export default {
    define: {
        local: false,
    },
    externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
        'lodash': 'window._',
    },
    chainWebpack: function(config, {webpack}) {
        config.merge({
            optimization: {
                nodeEnv: 'production',
                minimize: true,
                splitChunks: {
                    minChunks: 2,
                    cacheGroups: {
                        //pinball: {
                        //    name: 'pinball',
                        //    test: /[\\/]Pinball\/game[\\/]/,
                        //    chunks: 'all',
                        //    minChunks: 1,
                        //},
                        vendors: {
                            name: 'vendors',
                            test: /[\\/](node_modules)[\\/]/,
                            chunks: 'all',
                            minChunks: 1,
                        },
                    },
                },
            },
        });
    },
};
