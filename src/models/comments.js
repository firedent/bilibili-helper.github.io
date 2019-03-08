import Url from 'url-parse';
import {fetchFromHelper, htmlDecode} from '../utils/functions';

const myCommendConfig = {
    pn: 1, // 评论页数
    oid: 44808808, // 评论数据库id
    sort: 0, // 降序
    type: 1, // 1: 视频投稿评论类型，11: 图像投稿评论类型
    root: undefined, // 获取某条评论下的回复时设置
    csrf: null,
    plat: 1,
};

const targetConfig = {
    oid: 16116344,
    type: 11,
    sort: 0,
    pn: 1,
};

const testCommendConfig = {
    pn: 1,
    oid: 43669143,
    sort: 0,
    type: 1,
    root: undefined,
    csrf: null,
    plat: 1,
};

export default {
    state: {
        data: {
            replies: null,
            hots: null,
            page: { // 描述评论区一页的信息
                acount: 0, // 评论总量（包含回复）
                count: 0, // 评论楼层数
                num: 1, // 当前显示页数
                size: 20, // 每页显示数量
            },
            top: null,
        },
        votes: {
            rpidArray: [],
            likeSum: {},
        },
        members: {},
        replyMap: {},
        config: targetConfig,
        voteConfig: null,
        status: {
            comment: {
                loadPage: false,
                loadingRpid: null,
            },
            vote: {
              voting: false,
            },
            editor: {
                getting: false,
                sending: false,
                error: null,
            },
        },
    },
    subscriptions: {
        setup({dispatch, history}, done) {
            window.addEventListener('message', function(event) {
                const {commend = '', data = {}, from, model, sign} = event.data;
                if (from !== 'helper') return;
                if (model !== 'comment') return;
                switch (commend) {
                    case 'returnFetch': {
                        if (data.code === 0) {
                            switch (sign) {
                                case 'getComment':
                                    dispatch({type: 'updateCommentLoadingState', payload: false});
                                    dispatch({type: 'updateCommentData', payload: data.data});
                                    break;
                                case 'getReply':
                                    dispatch({type: 'updateReplyLoadingState', payload: false});
                                    dispatch({type: 'updateReplayData', payload: data.data});
                                    break;
                                case 'sendReply': {
                                    dispatch({type: 'updateEditorSendError', payload: null});
                                    const {dialog, parent, root, rpid} = data.data;
                                    setTimeout(() => {
                                        dispatch({type: 'updateEditorSendingState', payload: false});
                                        if (!dialog && !parent && !root && rpid) dispatch({type: 'fetchComment'});
                                        else dispatch({type: 'fetchReply', payload: {parent, root}});
                                    }, 1000);
                                    break;
                                }
                                case 'setLike': {
                                    const {rpid, action} = data.receipt;
                                    dispatch({type: 'updateCommentLikeStatus', payload: {rpid, action}});
                                    break;
                                }
                                case 'setHate': {
                                    const {rpid, action} = data.receipt;
                                    dispatch({type: 'updateCommentHateStatus', payload: {rpid, action}});
                                    break;
                                }
                                case 'getVote': {
                                    dispatch({type: 'updateVoteData', payload: data.data});
                                    break;
                                }
                            }
                        } else if (data.code === 12025) {
                            dispatch({type: 'updateEditorSendError', payload: data.message});
                        }
                        break;
                    }
                }
            });
        },
    },
    reducers: {
        updateCommentData: (state, {type, payload}) => {
            const calcReply = (reply) => {
                const {rpid, replies, rcount, member, content} = reply;
                reply.content.message = content.message
                                               .replace(/&#([\d]+);/g, (all, i) => String.fromCharCode(i))
                                               .replace(/(&.+;)/g, htmlDecode);
                state.members[member.mid] = member;
                state.replyMap[rpid] = {
                    self: reply,
                    replies: replies ? replies.map(calcReply) : null,
                    page: {
                        count: rcount,
                        num: 1,
                        size: 10,
                    },
                    root: {},
                    hasExpand: false,
                    needExpand: (replies && replies.length < rcount) || false,
                    pages: Math.ceil(rcount / 10),
                };
                return reply;
            };
            if (payload.upper && payload.upper.top) {
                payload.upper.top = calcReply(payload.upper.top);
            }
            if (payload.hots) {
                payload.hots = payload.hots.map(calcReply);
            }
            if (payload.replies) {
                payload.replies = payload.replies.map(calcReply);
            }
            state.data = {
                ...payload,
                top: payload.upper ? payload.upper.top : state.data.top,
            };
            return state;
        },
        updateConfig: (state, {type, payload}) => {
            state.config = {...state.config, ...payload};
            return state;
        },
        updateReplayData: (state, {type, payload}) => {
            const calcReply = (reply) => {
                const {rpid, replies, rcount, member, content} = reply;
                reply.content.message = content.message
                                               .replace(/&#([\d]+);/g, (all, i) => String.fromCharCode(i))
                                               .replace(/(&.+;)/g, htmlDecode);
                state.members[member.mid] = member;
                state.replyMap[rpid] = {
                    self: reply,
                    replies: replies ? replies.map(calcReply) : null,
                    page: {
                        count: rcount,
                        num: 1,
                        size: 10,
                    },
                    root: {},
                    hasExpand: false,
                    needExpand: (replies && replies.length < rcount) || false,
                    pages: Math.ceil(rcount / 10),
                };
                return reply;
            };
            const {replies, page, root, upper} = payload;
            const {count, size, num} = page;
            let targetReply = state.replyMap[root.rpid];
            state.replyMap[root.rpid] = {
                ...targetReply,
                replies: replies.map(calcReply),
                page,
                root,
                upper,
                pages: Math.ceil(count / size),
                hasExpand: replies.length === size || num !== 1,
                needExpand: replies.length < count && num === 1,
            };
            return state;
        },
        updateVoteData: (state, {payload}) => {
            const calcReply = (reply) => {
                const {rpid, replies, rcount, member, content} = reply;
                reply.content.message = content.message
                                               .replace(/&#([\d]+);/g, (all, i) => String.fromCharCode(i))
                                               .replace(/(&.+;)/g, htmlDecode);
                state.members[member.mid] = member;
                state.replyMap[rpid] = {
                    self: reply,
                    replies: replies ? replies.map(calcReply) : null,
                    page: {
                        count: rcount,
                        num: 1,
                        size: 10,
                    },
                    root: {},
                    hasExpand: false,
                    needExpand: (replies && replies.length < rcount) || false,
                    pages: Math.ceil(rcount / 10),
                };
                return reply;
            };
            if ((state.votes.rpidArray && state.votes.rpidArray.indexOf(payload.root.rpid) < 0) || !state.votes.rpidArray) {
                state.votes.rpidArray = [...state.votes.rpidArray, payload.root.rpid];
            }
            state.votes.likeSum[payload.root.rpid] = payload.root.like;
            calcReply(payload.root);
            return state;
        },
        updateVoteSum: (state, {payload}) => {
            if (payload) {
                const {rpid, like} = payload;
                state.votes.likeSum[rpid] = like;
            } else state.votes.likeSum = {};
            return state;
        },
        updateCommentLoadingState: (state, {payload}) => {
            state.status.comment.loadPage = payload;
            return state;
        },
        updateReplyLoadingState: (state, {payload}) => {
            state.status.comment.loadingRpid = payload;
            return state;
        },
        updateEditorSendingState: (state, {payload}) => {
            state.status.editor.sending = payload;
            return state;
        },
        updateEditorSendError: (state, {payload}) => {
            state.status.editor.error = payload;
            return state;
        },
        updateCommentLikeStatus: (state, {payload}) => {
            const {rpid, action} = payload;
            const reply = _.find(state.replyMap, (reply) => reply.self.rpid === rpid);
            if (reply) {
                if (reply.self.action === 0 || reply.self.action === 2) {
                    reply.self.action = 1;
                    reply.self.like += 1;
                } else if (reply.self.action === 1) {
                    reply.self.action = 0;
                    if (reply.self.like > 0) reply.self.like -= 1;
                }
            }
            state.replyMap[rpid] = reply;
            return state;
        },
        updateCommentHateStatus: (state, {payload}) => {
            const {rpid, action} = payload;
            const reply = _.find(state.replyMap, (reply) => reply.self.rpid === rpid);
            if (reply) {
                if (reply.self.action === 0) {
                    reply.self.action = 2;
                    if (reply.self.like > 0) reply.self.like -= 1;
                } else if (reply.self.action === 2) {
                    reply.self.action = 0;
                    //reply.self.like += 1;
                } else if (reply.self.action === 1) {
                    reply.self.action = 2;
                    reply.self.like -= 1;
                }
            }
            state.replyMap[rpid] = reply;
            return state;
        },
        updateVoteConfig: (state, {payload}) => {
            state.voteConfig = payload;
            return state;
        }
    },
    effects: {
        * loadVoteConfig ({payload}, {put, call}) {
            const configResponse = yield call(fetch, '../static/json/votes.json');
            if (configResponse.status === 200) {
                const config = yield configResponse.json();
                yield put({type: 'updateVoteConfig', payload: config});
            }
        },
        * load({payload}, {put, select}) {
            const {oid, pn, sort, type} = yield select(({comments}) => comments.config);
            const {oid: queryOid, pn: queryPn, ps: queryPs, root, type: queryType} = payload.query;
            if (payload.ptype) yield put({
                type: 'fetchReply',
                payload: _.pickBy({oid: queryOid || oid, ps: queryPs, sort, type: queryType || type}, _.identity),
            });
            else yield put({
                type: 'fetchComment',
                payload: _.pickBy({oid: queryOid || oid, pn: queryPn || pn, sort, type: queryType || type, root}, _.identity),
            });
        },
        * fetchComment({payload}, {put, select}) {
            yield put({type: 'updateCommentLoadingState', payload: true});
            const url = new Url('https://api.bilibili.com/x/v2/reply');
            const {oid, pn, sort, type} = yield select(({comments}) => comments.config);
            yield put({type: 'updateConfig', payload});
            url.set('query', {oid, pn, sort, type, ...payload});
            fetchFromHelper('json', {url: url.toString(), model: 'comment', sign: 'getComment'});
        },
        * fetchReply({payload}, {put, select}) {
            yield put({type: 'updateReplyLoadingState', payload: payload.root});
            const url = new Url('https://api.bilibili.com/x/v2/reply/reply');
            const {oid, type: originType} = yield select(({comments}) => comments.config);
            url.set('query', {oid, type: originType, ...payload});
            fetchFromHelper('json', {url: url.toString(), model: 'comment', sign: 'getReply'});
        },
        * sendReply({payload}, {put, select}) {
            yield put({type: 'updateEditorSendingState', payload: true});
            const url = 'https://api.bilibili.com/x/v2/reply/add';
            const {oid, type, plat} = yield select(({comments}) => comments.config);
            const csrf = yield select(({user}) => user.csrf);
            const {root, parent, message} = payload;
            const body = _.pickBy({oid, type, root, parent, message, plat, csrf}, _.identity);
            fetchFromHelper('post', {
                url,
                model: 'comment',
                sign: 'sendReply',
                options: {
                    method: 'POST',
                    body,
                },
            });
        },
        * setLike({payload}, {select}) {
            const url = new Url('https://api.bilibili.com/x/v2/reply/action');
            const {oid, type} = yield select(({comments}) => comments.config);
            const csrf = yield select(({user}) => user.csrf);
            fetchFromHelper('post', {
                url: url.toString(),
                model: 'comment',
                sign: 'setLike',
                options: {
                    method: 'POST',
                    body: {csrf, oid, type, ...payload},
                },
            });
        },
        * setHate({payload}, {select}) {
            const url = new Url('https://api.bilibili.com/x/v2/reply/hate');
            const {oid, type} = yield select(({comments}) => comments.config);
            const csrf = yield select(({user}) => user.csrf);
            fetchFromHelper('post', {
                url: url.toString(),
                model: 'comment',
                sign: 'setHate',
                options: {
                    method: 'POST',
                    body: {csrf, oid, type, ...payload},
                },
            });
        },
        * fetchVotes({}, {put, select}) {
            const votesConfig = yield select(({comments}) => comments.voteConfig);
            yield put({type: 'updateVoteSum'});
            if (!votesConfig) console.warn('no vote config');
            const {oid, type, rpids} = votesConfig;
            _.map(rpids, (root) => {
                const url = new Url('https://api.bilibili.com/x/v2/reply/reply');
                url.set('query', {oid, type, root});
                fetchFromHelper('json', {url: url.toString(), model: 'comment', sign: 'getVote'});
            });
        },
    },
};
