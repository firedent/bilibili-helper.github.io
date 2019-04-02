const path = require('path');
const srcPath = path.resolve('src');
export default {
    outputPath: './docs',
    hash: true,
    routes: [
        {
            path: '/', component: './layouts',
        },
    ],
    alias: {
        'Utils': path.resolve(srcPath, 'utils'),
        'Pinball': path.resolve(srcPath, 'components', 'Pinball'),
        'Components': path.resolve(srcPath, 'components'),
        'Modules': path.resolve(srcPath, 'models'),
        'Pages': path.resolve(srcPath, 'pages'),
        'JSON': path.resolve('static', 'json'),
        'Static': path.resolve(srcPath, 'static'),
    },
    copy: [
        {
            from: 'static/',
            to: 'static/',
        },
    ],
    plugins: [
        [
            'umi-plugin-react',
            {
                chunks: ['vendors', 'umi'],
                antd: false,
                dva: {
                    immer: true,
                },
                //hardSource: true,
                dynamicImport: true,
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
