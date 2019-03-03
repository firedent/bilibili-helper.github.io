import {sendCommendToHelper} from 'Utils/functions';

export default {
    state: {
        version: null,
        status: {
            init: false,
            tryConnect: false,
            connect: false,
            error: null,
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            window.addEventListener('message', function(event) {
                const {commend = '', data = {}, from, model, sign} = event.data;
                if (from !== 'helper') return;
                if (model !== 'global') return;
                switch (commend) {
                    case 'returnApp': {
                        if (data.code === 0) {
                            switch (sign) {
                                case 'connect': {
                                    dispatch({type: 'initApp', payload: data.data});
                                    dispatch({type: 'user/fetchCsrf'});
                                    dispatch({type: 'user/fetchUser'});
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
            });
            //dispatch({type: 'connectHelper'});
        },
    },
    reducers: {
        updateTryConnect(state) {
            state.status.tryConnect = true;
            return state;
        },
        initApp(state, {payload}) {
            state.status.init = payload ? true : false;
            state.version = payload.version;
            return state;
        },
    },
    effects: {
        * connectHelper({}, {put}) {
            sendCommendToHelper('connect', {model: 'global', sign: 'connect'});
            yield put({type: 'updateTryConnect'});
        },
    },
};
