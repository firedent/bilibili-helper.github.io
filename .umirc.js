const path = require('path');
const srcPath = path.resolve('src');
export default {
    define: {
        lastVersion: '1.2.0.8',
    },
    routes: [
        {
            path: '.', component: './layouts',
        },
    ],
    alias: {
        'Utils': path.resolve(srcPath, 'utils'),
        'Components': path.resolve(srcPath, 'components'),
        'Modules': path.resolve(srcPath, 'models'),
        'Pages': path.resolve(srcPath, 'pages'),
    },
    plugins: [
        [
            'umi-plugin-react',
            {
                antd: false,
                dva: {
                    immer: true,
                },
                routes: {
                    exclude: [
                        /model\.(j|t)sx?$/,
                        /service\.(j|t)sx?$/,
                        /models\//,
                        /components\//,
                        /services\//,
                    ],
                },
            },
        ],
    ],
};
