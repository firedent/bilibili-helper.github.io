import {sendCommendToHelper} from 'Utils/functions';

export default {
    state: {
        //version: null,
        config: null,
        status: {
            initializing: false,
            error: null,
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            window.addEventListener('message', function(event) {
                const {commend = '', data = {}, from, model, sign} = event.data;
                if (from !== 'helper') return;
                if (model !== 'announcements') return;
            });
            dispatch({type: 'fetchAnnouncementConfig'});
        },
    },
    reducers: {
        updateTryConnect(state) {
            state.status.tryConnect = true;
            return state;
        },
        initApp(state, {payload}) {
            if (payload.connected) state.status.connected = payload.connected;
            if (payload.config) state.version = payload.config;
            if (payload.initializing) state.initializing = payload.initializing;
            return state;
        },
        updateAnnouncementConfig(state, {payload}) {
            state.config = payload;
            return state;
        },
    },
    effects: {
        * connectHelper({}, {put}) {
            sendCommendToHelper('connect', {model: 'global', sign: 'connect'});
            yield put({type: 'initApp', payload: {initializing: true}});
            yield put({type: 'updateTryConnect'});
        },
        * fetchAnnouncementConfig({}, {put, call}) {
            const configResponse = yield call(fetch, '../static/json/announcement.json');
            if (configResponse.status === 200) {
                const config = yield configResponse.json();
                yield put({type: 'updateAnnouncementConfig', payload: config});
            }
        },
    },
};
