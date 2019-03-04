import {sendCommendToHelper} from 'Utils/functions';

export default {
    state: {
        version: null,
        status: {
            initializing: false,
            tryConnect: false,
            connected: false,
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
                                    dispatch({type: 'user/fetchUser'});
                                    dispatch({type: 'user/fetchCsrf'});
                                    dispatch({type: 'comments/fetchVotes'});
                                    dispatch({type: 'initApp', payload: {...data.data, initializing: false}});
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
            });
            dispatch({type: 'connectHelper'});
        },
    },
    reducers: {
        updateTryConnect(state) {
            state.status.tryConnect = true;
            return state;
        },
        initApp(state, {payload}) {
            if (payload.connected) state.status.connected = payload.connected;
            if (payload.version) state.version = payload.version;
            if (payload.initializing) state.initializing = payload.initializing;
            return state;
        },
    },
    effects: {
        * connectHelper({}, {put}) {
            sendCommendToHelper('connect', {model: 'global', sign: 'connect'});
            yield put({type: 'initApp', payload: {initializing: true}});
            yield put({type: 'updateTryConnect'});
        },
    },
};
