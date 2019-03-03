/* global require, module, process */
/**
 * Author: Ruo
 * Create: 2018-05-30
 * Description:
 */

const path = require('path');
const srcPath = path.resolve('src');
module.exports = () => {
    return {
        resolve: {
            alias: {
                'Utils': path.resolve(srcPath, 'utils'),
                'Components': path.resolve(srcPath, 'components'),
                'Modules': path.resolve(srcPath, 'models'),
                'Pages': path.resolve(srcPath, 'pages'),
            },
        },
    };
};
