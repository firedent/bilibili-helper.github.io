export const dva = {
    config: {
        onError(e) {
            e.preventDefault();
            //console.error(e.message);
        },
    },
    plugins: [
        //require('dva-logger')({
        //    predicate: (state, action) => action.type.indexOf('@') === -1 && action.type !== 'image/update' && action.type !== 'image/fetch',
        //    collapsed: true,
        //}),
    ],
};

