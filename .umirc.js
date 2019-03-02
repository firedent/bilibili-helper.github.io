export default {
    routes: [
        {
            path: '.', component: './layouts',
            routes: [
                {path: '/:oid/:page/:reply', component: './layouts'},
            ],
        },
    ],
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
