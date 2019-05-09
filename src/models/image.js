import {fetchFromHelper} from '../utils/functions';

export default {
    state: {},
    subscriptions: {
        setup({dispatch, history}) {
            window.addEventListener('message', function(event) {
                const {command = '', data = {}, from, model, sign} = event.data;
                if (from !== 'helper') return;
                if (model !== 'image') return;
                switch (command) {
                    case 'returnFetch': {
                        dispatch({type: 'update', payload: {url: data, sign}});
                        break;
                    }
                }
            });
        },
    },
    reducers: {
        update(state, {type, payload}) {
            const {url, sign} = payload;
            state[sign] = url;
            return state;
        },
    },
    effects: {
        * fetch({type, payload}, {put, call, select}) {
            const {url, sign} = payload;
            yield select(({image}) => {
                if (image[sign]) return;
                fetchFromHelper('image', {
                    url,
                    model: 'image',
                    sign,
                    mine: 'image/jpeg',
                });
            });
        },
    },
};
