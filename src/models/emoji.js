import {fetchFromHelper} from '../utils/functions';

const DEFAULT_EMOJI = {
    pid: 0,
    pname: '颜文字',
    pstate: 0,
    purl: 'https://static.hdslb.com/images/base/emoji-tab-default.png',
    type: 'text',
    emojis: [
        '(⌒▽⌒)', '（￣▽￣）', '(=・ω・=)', '(｀・ω・´)', '(〜￣△￣)〜',
        '(･∀･)', '(°∀°)ﾉ', '(￣3￣)', '╮(￣▽￣)╭', '( ´_ゝ｀)', '←_←', '→_→',
        '(<_<)', '(>_>)', '(;¬_¬)', '("▔□▔)/', '(ﾟДﾟ≡ﾟдﾟ)!?', 'Σ(ﾟдﾟ;)',
        'Σ( ￣□￣||)', '(´；ω；`)', '（/TДT)/', '(^・ω・^ )', '(｡･ω･｡)',
        '(●￣(ｴ)￣●)', 'ε=ε=(ノ≧∇≦)ノ', '(´･_･`)', '(-_-#)', '（￣へ￣）',
        '(￣ε(#￣) Σ', 'ヽ(`Д´)ﾉ', '(╯°口°)╯(┴—┴', '（#-_-)┯━┯',
        '_(:3」∠)_', '(笑)', '(汗)', '(泣)', '(苦笑)',
    ],
};
export default {
    state: {
        optionJSON: [],
        emojiURLs: {},
        emojiMap: {},
    },
    subscriptions: {
        setup({dispatch, history}) {
            window.addEventListener('message', function(event) {
                const {command = '', commend = '', data = {}, from, model, sign} = event.data;
                if (from !== 'helper') return;
                if (model !== 'emoji') return;
                switch (command || commend) {
                    case 'returnFetch': {
                        dispatch({type: 'updateOptions', payload: data.data});
                        break;
                    }
                }
            });
            dispatch({type: 'fetchOptions'});
        },
    },
    reducers: {
        updateOptions(state, {type, payload}) {
            const emojiURLs = {};
            const {vip, free} = payload;
            free.forEach(({pid, emojis, purl}) => {
                emojiURLs[pid] = purl;
                emojis.forEach(({name, url}) => {
                    if (url) emojiURLs[name] = url;
                });
            })
            vip.forEach(({pid, emojis, purl}) => {
                emojiURLs[pid] = purl;
                emojis.forEach(({name, url}) => {
                    if (url) emojiURLs[name] = url;
                });
            });
            state.optionJSON = [DEFAULT_EMOJI, ...free, ...vip];
            state.emojiURLs = emojiURLs;
            return state;
        },
    },
    effects: {
        * fetchOptions({type, payload}, {put, call, select}) {
            fetchFromHelper('json', {
                url: 'https://api.bilibili.com/x/v2/reply/v2/emojis',
                model: 'emoji',
            });
        },
        //* fetchEmoji({type, payload}, {put, call, select}) {
        //    select(({emoji}) => {
        //        console.warn(emoji);
        //    });
        //    //fetchFromHelper('image', {
        //    //    url,
        //    //    model: 'avatar',
        //    //    sign,
        //    //    mine: 'image/jpeg',
        //    //});
        //},
    },
};
