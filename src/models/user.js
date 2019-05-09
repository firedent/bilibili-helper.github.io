import Url from 'url-parse';
import {fetchFromHelper, getCookieFromHelper} from '../utils/functions';

export default {
    state: {
        info: null,
        csrf: null,
    },
    subscriptions: {
        setup({dispatch, history}) {
            window.addEventListener('message', function(event) {
                const {command = '', data = {}, from, model, sign} = event.data;
                if (from !== 'helper') return;
                if (model !== 'user') return;
                switch (command) {
                    case 'returnFetch': {
                        if (data.code === 'REPONSE_OK' || data.code === 0) {
                            //if (sign === 'reply') {
                            dispatch({type: 'updateUserData', payload: data.data});
                            //} else dispatch({type: 'updateCommentData', payload: data.data});
                        } else console.error(data);
                        break;
                    }
                    case 'returnCookie': {
                        if (sign === 'getCsrf') {
                            dispatch({type: 'updateCsrf', payload: data});
                        }
                        break;
                    }
                }
            });
            //dispatch({type: 'fetchCsrf'});
            //dispatch({type: 'fetchUser'});
        },
    },
    reducers: {
        updateUserData(state, {payload}) {
            state.info = payload;
            return state;
        },
        updateCsrf(state, {payload}) {
            state.csrf = payload;
            return state;
        },
    },
    effects: {
        * fetchCsrf({type, payload}, {put, call, select}) {
            getCookieFromHelper({
                detail: {
                    url: 'http://interface.bilibili.com/',
                    name: 'bili_jct',
                },
                model: 'user',
                sign: 'getCsrf',
            });
        },
        * fetchUser({type, payload}, {put, call, select}) {
            const url = new Url('https://api.live.bilibili.com/xlive/web-ucenter/user/get_user_info');
            fetchFromHelper('json', {url: url.toString(), model: 'user'});
        },
    },
};
