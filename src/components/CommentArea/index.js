/**
 * Author: DrowsyFlesh
 * Create: 2019/2/28
 * Description:
 */
import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import withRouter from 'umi/withRouter';
import Link from 'umi/link';
import moment from 'moment';
import {connect} from 'dva';
import Image from 'Components/Image';
import Emoji from './Emoji';
import CommentEditor from './CommentEditor';
import {LOADING_IMAGE_URL} from './loadingImage';
import Page from 'Components/Page';
import {cumulativeOffset} from 'Utils/functions';
import LazyLoad from 'react-lazy-load';

moment.locale('zh-cn');

const CommentListArea = styled(Page).attrs({className: 'comment-area'})`
  position: relative;
  .no-reply {
    color: var(--content-color);
  }
  .more-comment-list-wrapper {
    position: relative;
    .loading-page-mask {
      position: absolute;
      top: -10px;
      right: -10px;
      bottom: -10px;
      left: -10px;
      min-height: 200px;
      border-radius: 3px;
      background-color: rgba(85, 85, 85, 0.5);
      color: var(--content-color);
      img {
        position: absolute;
        top: 50px;
        left: calc(50% - 50px);
        width: 100px;
        height: 100px;
        background-color: rgba(252, 252, 252, 0.8);
        border-radius: 3px;
      }
    }
  }
  .list-wrapper {
    position: relative;
  }
`;

const Header = styled.header.attrs({className: 'comment-list-header'})`
  font-size: 20px;
  margin: 20px 10px 30px 0;
  color: #a9a7a7;
  p {
    margin: 3px 0px;
    font-size: 12px;
  }
  a {
    color: var(--bilibili-blue);
  }
`;
const Comment = styled.div.attrs({className: 'comment-item'})`
  display: flex;
  margin-bottom: 30px;
  &:last-of-type > .main{
    & > .content:last-of-type {
      border-bottom: none;
    }
    .replies-box {
      border-bottom: none;
    }
  }
  .user {
    width: 70px;
    flex-shrink: 0;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }
  .main {
    flex-grow: 1;
    .header {
      display: flex;
      line-height: 12px;
      margin: 0 10px 10px 0;
      & > * {
        margin-right: 10px;
        font-size: 12px;
        color: #999;
        text-decoration: unset;
        font-style: unset;
      }
      .top {
        margin-right: 8px;
        padding: 0 3px;
        border: 1px solid;
        border-radius: 3px;
        color: var(--bilibili-pink);
        transform: scale(0.9);
      }
      .username {
        font-weight: bold;
        color: #666;
        &.vip {
          color: #fb7299;
        }
      }
      .floor {
        flex-grow: 1;
        text-align: right;
        margin-right: 0;
        color: #ccc;
      }
      .moment {
      }
    }
    .content {
      padding: 0 10px 30px 0;
      position: relative;
      color: var(--content-color);
      border-bottom: 1px solid var(--border-color);
      font-size: 14px;
      pre {
        overflow-x: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
        font-family: auto;
      }
      .toolbar {
        position: absolute;
        font-size: 10px;
        bottom: 3px;
        color: #bbb;
        .like-box {
          display: inline-block;
          user-select: none;
          span {
            line-height: 16px;
            margin-right: 20px;
            cursor: pointer;
            &.like:hover, &[on='1'] {
              color: var(--bilibili-blue);
            }
            &.hate:hover, &[on='1'] {
              color: var(--bilibili-pink);
            }
          }
        }
        .reply {
          padding: 3px 6px;
          border: none;
          border-radius: 3px;
          background-color: var(--background-color);
          color: var(--bilibili-blue);
          transform: scale(0.8);
          transition: all 0.15s;
          cursor: pointer;
          outline: none;
          user-select: none;
          &:hover, &[on='1'] {
            background-color: var(--bilibili-blue);
            color: var(--background-color);
          }
        }
      }
    }
    .replies-box {
      position: relative;
      padding-top: 30px;
      border-bottom: 1px solid var(--border-color);
      & > .replies > * {
        margin-bottom: 20px;
        &:nth-last-of-type(1) {
          border-bottom: none;
          .content {
            border-bottom: none;
          }
        }
        .user {
          width: 40px;
          img{
            width: 26px;
            height: 26px;
            flex-shrink: 0;
            transition: all 0.3s;
            &:hover {
              transform: scale(1.5);
            }
          }
        }
        .floor {
          color: #e6e6e6;
        } 
      }
      .loading-page-mask {
        img {
          top: calc(50% - 50px);
        }
      }
    }
  }
`;

const HR = styled.div`
  display: block;
  width: fit-content;
  margin: 0 auto 60px;
  padding: 3px 20px;
  border: none;
  border-radius: 3px;
  letter-spacing: 1px;
  font-size: 12px;
  background-color: var(--background-color);
  color: var(--content-color);
  outline: none;
  transition: all 0.15s;
  &:not([disabled]):hover {
    background-color: var(--bilibili-blue);
    color: var(--background-color);
    cursor: pointer;
  }
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    margin-top: -8px;
    position: absolute;
    left: 0;
    right: 0;
    background-color: var(--border-color);
    z-index: -1;
    cursor: pointer;
  }
  .replies-box & {
    margin-left: 20px;
    margin-bottom: 30px;
    margin-top: 20px;
    &::after {
      visibility: hidden;
    }
  } 
`;

const PageNavigation = styled.div.attrs({className: 'page-navigation'})`
  display: flex;
  justify-content: center;
  & > a {
    text-decoration: none;
  }
  & .page-navigation-link {
    display: block;
    min-width: 20px;
    margin: 0 3px;
    padding: 5px 6px;
    text-align: center;
    letter-spacing: 1px;
    border: 1px solid #eee;
    border-radius: 5px;
    color: #333;
    user-select: none;
    transform: scale(0.8);
    cursor: pointer;
    &:not(.omit):hover {
      color: var(--bilibili-blue);
      border-color: var(--bilibili-blue);
      transition: all 0.3s;
    }
    &.omit {
      border: none;
      cursor: default;
    }
    &.now {
      border-color: var(--bilibili-blue);
      background-color: var(--bilibili-blue);
      color: var(--background-color);
      &:hover {
        color: var(--background-color);
      }
    }
  }
  .replies-box & {
    justify-content: left;
    & .page-navigation-link {
      margin: 0;
      border: none;
      background-color: transparent;
      &.now {
        color: var(--bilibili-blue);
      }
    }
  }
`;
const CommentMapWrapper = styled.div`
  position: absolute;
  top: 210px;
  bottom: 0;
  left: 100%;
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const CommentMap = styled.div`
  position: sticky;
  top: 210px;
  text-align: right;
  i {
    font-style: normal;
    font-size: 12px;
    text-align: center;
    display: block;
    color: var(--content-color);
    opacity: 0.3;
  }
  .nav-item {
    display: block;
    line-height: 20px;
    margin-bottom: 10px;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    border-right: 1px solid var(--bilibili-pink);
    text-decoration: none;
    color: var(--content-color);
    cursor: pointer;
    transition: all 0.15s;
    &:hover {
      color: var(--bilibili-pink);
    }
    &.on {
      color: var(--bilibili-pink);
      cursor: default;
    }
  }
`;

class CommentArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uname: '',
            rpid: null,
        };
    }

    componentDidUpdate(prevProps) {
        const {comments, location} = this.props;
        const {commentMap} = comments;
        if ((location.query.page !== prevProps.location.query.page && prevProps.location.query.ptype === '0') || // 换页
            (location.query.oid !== prevProps.location.query.oid) || // 切换评论区
            (prevProps.location.query.oid !== undefined && !prevProps.comments.config)) { // 从地址初始化评论区
            const currentComment = _.find(commentMap, (comment) => comment.config.oid === +location.query.oid);
            this.load(currentComment);
        } else if (!prevProps.comments.config && commentMap.length >= prevProps.comments.commentMap.length && !location.query.oid) {
            commentMap.length > 0 && this.load(commentMap[0]);
        }
    }

    load = (comment) => {
        const {comments, dispatch, location} = this.props;
        let config = comment.config;
        if (!config && comments.config) {
            comment = comments.config;
            config = comment.config;
        }
        const {oid = config.oid, page = 1, ptype = 0, type = config.type} = location.query;
        const query = {oid, [+ptype ? 'ps' : 'pn']: page, type};
        dispatch({type: 'comments/load', payload: {comment, query, ptype: +ptype}});
    };

    calculateNavigationPageIndex = (num, pages) => {
        const array = new Array(pages).fill(undefined).map((v, k) => k);
        let centerPageIndex = _.compact(array.map((o, index) => {
            if (Math.abs(num - index - 1) <= 2) return index + 1 <= 0 ? undefined : index + 1;
        }));
        if (centerPageIndex[0] !== 1) {
            if (centerPageIndex[0] > 2) centerPageIndex.unshift('-');
            centerPageIndex.unshift(1);
        }

        if (centerPageIndex.length > 1 && centerPageIndex[centerPageIndex.length - 1] < pages) {
            if (pages - centerPageIndex[centerPageIndex.length - 1] > 1) centerPageIndex.push('-');
            centerPageIndex.push(pages);
        }
        return centerPageIndex;
    };

    handleOnClickHots = () => {
        this.props.dispatch({type: 'comments/fetchComment', payload: {sort: 1}});
    };

    handleOnClickLoadMoreReplies = (payload = {}) => {
        this.props.dispatch({type: 'comments/fetchReply', payload: {pn: 1, ps: 10, ...payload}});
    };

    // 点击全局评论列表中的分页按钮
    handleOnClickNavigation = () => {
        window.scrollTo(0, cumulativeOffset(this.moreCommentListWrapper).top - 20);
    };

    // 点击回复列表中的分页按钮
    handleOnClickNavigationForReply = (payload) => {
        const targetReply = this[`reply-${payload.root}`];
        if (targetReply) {
            targetReply.querySelector('.replies-box').scrollIntoView({behavior: 'smooth', inline: 'start'});
        }
        this.props.dispatch({type: 'comments/fetchReply', payload});
    };

    // 点击回复按钮 设置发送者的id和名字
    handleOnClickReply = ({uname, rpid}) => this.setState({uname, rpid: rpid === this.state.rpid ? null : rpid});

    handleOnClickLike = (action, rpid) => {
        this.props.dispatch({type: 'comments/setLike', payload: {action, rpid}});
    };

    handleOnClickHate = (action, rpid) => {
        this.props.dispatch({type: 'comments/setHate', payload: {action, rpid}});
    };

    // 处理评论的表情
    renderContent = (content) => {
        content = content.replace('【', '[').replace('】', ']');
        const emojiRegex = new RegExp(/(\[.*?\])/g);
        const finalContent = [];
        let tempRes = null, tempIndex = 0;
        while ((tempRes = emojiRegex.exec(content)) !== null) {
            const {index} = tempRes;
            const name = tempRes[0];
            finalContent.push(content.substr(tempIndex, index - tempIndex));
            tempIndex = index + name.length;
            finalContent.push(<Emoji key={index} sign={name}/>);
        }
        if (content.substr(tempIndex)) finalContent.push(content.substr(tempIndex));
        if (finalContent.length === 0) finalContent.push(content);
        return finalContent;
    };

    renderLine = ({rpid, top}) => {
        const {config: currentComment, status} = this.props.comments;
        const replyData = this.props.comments.replyMap[rpid];
        const {action, content, member, floor, ctime, like, oid, root} = replyData.self;
        const {uname: replyUname, rpid: replyRpid} = this.state;
        const {avatar, mid, uname, level_info, vip} = member;
        const {current_level} = level_info;
        const {vipType} = vip;
        const showRootEditor = replyRpid === rpid;
        let pageIndex = [], showLoadMore = false;
        if (replyData.replies) {
            showLoadMore = replyData.needExpand && !replyData.hasExpand;
            pageIndex = this.calculateNavigationPageIndex(replyData.page.num, replyData.pages);
        }
        return (
            <Comment key={rpid} id={rpid} ref={i => this[`reply-${rpid}`] = i}>
                <div className="user">
                    <LazyLoad>
                        <Image className={'avatar'} url={avatar} sign={mid}/>
                    </LazyLoad>
                </div>
                <div className="main">
                    <div className="header">
                        {top && <span className="top">TOP</span>}
                        <a
                            className={`username ${vipType ? 'vip' : ''}`}
                            href={`https://space.bilibili.com/${mid}`}
                            target="_blank"
                        >{uname}</a>
                        {current_level && <span className="level">Lv.{current_level}</span>}
                        <span className="moment">{moment(ctime * 1000).startOf('second').fromNow()}</span>
                        {floor && <span className="floor">#{floor}</span>}
                    </div>
                    <div className="content">
                        <pre>{this.renderContent(content.message)}</pre>
                        <div className="toolbar">
                            <div className="like-box">
                                <span
                                    className="like"
                                    on={action === 1 ? '1' : '0'}
                                    onClick={() => this.handleOnClickLike(Number(action !== 1), rpid)}
                                >LIKE {like || ''}</span>
                                <span
                                    className="hate"
                                    on={action === 2 ? '1' : '0'}
                                    onClick={() => this.handleOnClickHate(Number(action !== 2), rpid)}
                                >HATE</span>
                            </div>
                            {currentComment.canComment && <button
                                className="reply"
                                on={showRootEditor ? '1' : '0'}
                                onClick={() => this.handleOnClickReply({uname, rpid})}
                            >REPLY</button>}
                        </div>
                    </div>
                    {showRootEditor && <CommentEditor root={root || rpid} parent={rpid} name={replyUname}/>}
                    {replyData.replies && replyData.replies.length > 0 && (
                        <div className="replies-box">
                            <div className="replies">
                                {replyData.replies.map((comment) => this.renderLine(comment))}
                            </div>
                            {showLoadMore && replyData.page.num === 1 &&
                            (<HR onClick={() => this.handleOnClickLoadMoreReplies({root: rpid, oid})}>~ LOAD MORE ~</HR>)}
                            {!showLoadMore && replyData.pages > 1 &&
                            this.renderPageNavigation({
                                oid: currentComment.config.oid,
                                pageIndex,
                                num: replyData.page.num,
                                pages: replyData.pages,
                                root: rpid,
                                ptype: 1,
                            })}
                            {status.comment.loadingRpid === rpid && (
                                <div className="loading-page-mask">
                                    <Image url={LOADING_IMAGE_URL} sign="loading-gif"/>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Comment>
        );
    };

    renderPageNavigation = ({oid, pageIndex, num, pages, root, ptype = 0}) => {
        let handleFunc = () => {};
        if (root) handleFunc = (num) => this.handleOnClickNavigationForReply({pn: num, ps: 10, sort: 0, root});
        else handleFunc = (num) => this.handleOnClickNavigation({pn: num});
        return (
            <PageNavigation>
                {pageIndex.length > 2 && num > 1 && (
                    <Link key={'prev'} to={`?oid=${oid}&page=${num - 1}&ptype=${ptype}`}>
                        <span className="page-navigation-link" onClick={() => handleFunc(num - 1)}>PREV</span>
                    </Link>
                )}
                {pageIndex.map((pageNum, index) => {
                    return (
                        <Link key={pageNum + index} to={`?oid=${oid}&page=${pageNum}&ptype=${ptype}`}>
                            <span
                                className={`page-navigation-link ${pageNum === '-' ? 'omit' : ''} ${num === pageNum ? 'now' : ''}`}
                                onClick={num !== pageNum && pageNum !== '-' ? () => handleFunc(pageNum) : null}
                            >{pageNum !== '-' ? pageNum : '...'}</span>
                        </Link>
                    );
                })}
                {pageIndex.length > 2 && num < pages && (
                    <Link key={'next'} to={`?oid=${oid}&page=${num + 1}&ptype=${ptype}`}>
                        <span className="page-navigation-link" onClick={() => handleFunc(num + 1)}>NEXT</span>
                    </Link>
                )}
            </PageNavigation>
        );
    };

    render = () => {
        const {comments, user, global} = this.props;
        const {mid, uname} = this.state;
        const {data, config: currentComment, status, commentMap} = comments;
        const {page, hots, top, replies = []} = data;
        const {count, size, acount, num} = page;
        const pages = Math.ceil(count / size) || 1;
        const pageIndex = this.calculateNavigationPageIndex(num, pages);
        return (
            <CommentListArea>
                {/* header */}
                <Header>
                    {`${acount} 评论`}
                    {currentComment === null && <p>尚未加载评论区</p>}
                    {currentComment && <p>
                        本评论区来自哔哩哔哩弹幕网的评论系统，请遵守相关法律法规并共同维护秩序
                        {currentComment.canComment && <React.Fragment>，原地址为:<a
                            target="_blank"
                            href={`https://h.bilibili.com/${currentComment.config.oid}#canvas-detail-comment-ctnr`}
                        >h{currentComment.config.oid}</a></React.Fragment>}

                    </p>}
                </Header>

                {/* send box */}
                {currentComment && <CommentEditor global receiver={{mid, uname}} able={currentComment.canComment}/>}

                {global.status.connected && currentComment && (<React.Fragment>
                    {/* empty */}
                    {acount === 0 && !top && !hots && !replies && !status.comment.loadPage &&
                    (<div className="no-reply">没有留言，{!user.info && '登陆后'}开始评论吧~</div>)}

                    {/* not empty */}
                    {acount !== 0 && (top || hots || replies || status.comment.loadPage) &&
                    (<div className="more-comment-list-wrapper" ref={i => this.moreCommentListWrapper = i}>
                        {/* top */}
                        {num === 1 && top && (
                            <div className="wrapper">
                                <div id="top" className="comment-list">{this.renderLine({...top, top: true})}</div>
                                <HR disabled>IT'S A TOP COMMENT ABOVE</HR>
                            </div>
                        )}

                        {/* hots */}
                        {num === 1 && hots && (
                            <div className="list-wrapper">
                                <div id="hots" className="comment-list">
                                    {hots.map((comment) => top ? comment.rpid !== top.rpid && this.renderLine(comment) : this.renderLine(comment))}
                                </div>
                                <HR onClick={this.handleOnClickHots}>LOAD MORE HOT COMMENTS</HR>
                            </div>
                        )}

                        {/* normal replies */}
                        {replies && (
                            <div className="list-wrapper">
                                <div id="comments" className="comment-list">
                                    {replies.map((comment) => top ? comment.rpid !== top.rpid && this.renderLine(comment) : this.renderLine(comment))}
                                </div>
                                {this.renderPageNavigation({oid: currentComment.config.oid, pageIndex, num, pages})}
                            </div>
                        )}

                        {/* loading mask */}
                        {status.comment.loadPage && (
                            <div className="loading-page-mask">
                                <Image url={LOADING_IMAGE_URL} sign="loading-gif"/>
                            </div>
                        )}
                    </div>)}
                </React.Fragment>)}
                {commentMap && currentComment && (
                    <CommentMapWrapper>
                        <CommentMap>
                            {commentMap.map((comment) => {
                                const {config: thisConfig, name} = comment;
                                const {oid} = thisConfig;
                                const on = +oid === +currentComment.config.oid;
                                return <Link key={oid} to={`?oid=${oid}&page=${1}&ptype=${0}`} className={`nav-item ${on ? 'on' : ''}`}>{name}</Link>;
                            })}
                            <i>切换评论区</i>
                        </CommentMap>
                    </CommentMapWrapper>
                )}
            </CommentListArea>
        );
    };
}

export default withRouter(connect(({global, comments, user}) => ({global, comments, user}))(CommentArea));
