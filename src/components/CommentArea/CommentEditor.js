/**
 * Author: DrowsyFlesh
 * Create: 2019/3/1
 * Description:
 */
import React from 'react';
import styled from 'styled-components';
import {connect} from 'dva';
import Image from '../Image';

const CommentEditorWrapper = styled.div.attrs({className: 'comment-editor'})`
  position: relative;
  display: flex;
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--border-color);
  transform: scale(${({canUse}) => canUse ? 1 : 0.95});
  z-index: 100;
  &:last-of-type {
    border-bottom: none;
  }
  .mask{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -20px;
    right: -20px;
    bottom: 20px;
    left: -20px;
    border-radius: 3px;
    background-color: rgba(85, 85, 85, 0.75);
    color: var(--pure-white);
    user-select: none;
    z-index: 1;
  }
  
  .replies &, .main & {
    border-bottom: none;
    margin: 30px 0 10px;
    padding-bottom: 0;
    transform: scale(0.97);
    .header {
      width: 30px;
      img {
        width: 25px;
        height: 25px;
      }
    }
    .mask {
      top: -10px;
      right: -10px;
      bottom: -10px;
      left: -10px;
    }
  }
  .header {
    flex-shrink: 0;
    width: 120px;
    img {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  }
  .main {
    flex-grow: 1;
    .send-box {
      display: flex;
      border-radius: 3px;
      overflow: hidden;
      button {
        width: 80px;
        border: none;
        font-size: 14px;
        background-color: var(--bilibili-blue);
        color: var(--background-color);
        cursor: pointer;
        outline: none;
        transition: all 0.15s;
        user-select: none;
        &:hover {
          opacity: 0.9;
        }
        &:active {
          opacity: 1;
        }
        &[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
    .toolbar {
      position: relative;
      .stickers-btn {
        padding: 3px 10px;
        border: 1px solid var(--border-color);
        border-radius: 3px;
        color: var(--content-color);
        cursor: pointer;
        outline: none;
        transition: all 0.1s;
        &:hover, &[open] {
          background-color: var(--bilibili-blue);
          color: var(--background-color);
        }
        &[disabled] {
          cursor: not-allowed;
          background-color: unset;
          color: var(--content-color);
          opacity: 0.2;
        }
      }
      .stickers-box {
        position: absolute;
        top: 24px;
        width: 388px;
        height: auto;
        border-radius: 3px;
        border: 1px solid var(--border-color);
        background-color: var(--pure-white);
        box-shadow: rgba(20, 20, 20, 0.1) 1px 1px 10px;
        z-index: 100;
        .stickers {
          height: 175px;
          padding: 5px;
          overflow: auto;
          &::-webkit-scrollbar {
            display: none;
          }
          .sticker {
            margin: 2px;
            padding: 4px 5px;
            border-radius: 3px;
            cursor: pointer;
            transition: all 0.3s;
            user-select: none;
            &:hover {
              background-color: var(--border-color);
            }
            &.text {
              display: inline-block;
              font-size: 12px;
            }
            &.img {
              width: 40px;
              height: 40px;
            }
          }
        }
        .stickers-nav {
          position: relative;
          display: flex;
          justify-content: space-between;
          background-color: var(--border-color);
          & > div {
            margin: 2px;
            padding: 3px;
            border-radius: 3px;
            transition: background-color 0.3s;
            cursor: pointer;
            user-select: none;
            &[on="1"], &:hover {
              background-color: var(--background-color);
            }
          }
          .tab-btn, img {
            display: block;
            width: 21px;
            height: 21px;
            line-height: 21px;
            font-size: 12px;
          }
          .tab-btn {
            width: auto;
            padding: 3px 6px;
          }
          img {
            &:not([src]) {
              width: 27px;
              height: 27px;
              border: 1px solid var(--content-color);
              box-sizing: border-box;
            }
          }
        }
      }
      .send-error {
        padding: 3px 10px;
        display: inline-block;
        font-size: 12px;
        color: var(--bilibili-pink);
      }
    }
  }
  textarea {
    display: inline-block;
    width: 100%;
    height: 65px;
    padding: 5px 10px;
    line-height: normal;
    border-radius: 4px;
    border: 1px solid var(--border-color);
    font-size: 12px;
    box-sizing: border-box;
    background-color: var(--border-color);
    overflow: auto;
    color: #555;
    transition: all 0.15s;
    outline: none;
    resize: none;
    &:hover, &:focus-within {
      background-color: var(--pure-white);
    }
    &[disabled] {
      opacity: 0.2;
      background-color: var(--border-color);
      cursor: not-allowed;
    }
  }
`;

class CommentEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            on: false,
            emojiNavigation: {
                pid: 0,
                start: 0,
                length: 7,
                current: 0,
            },
            tempMessage: null,
        };
        this.onCommandDown = false;
    }

    handleOnClickStickersBtn = () => {
        this.setState({on: !this.state.on});
        if (!this.state.on) this.textarea.focus();
        else this.textarea.blur();
    };

    handleOnClickStickerNavPrev = () => {
        const {optionJSON} = this.props.emoji;
        const {start, current} = this.state.emojiNavigation;
        let prev = start - 1;
        if (prev < 0) prev = 0;
        const nextCurrent = current - 1 > 0 ? current - 1 : 0;
        const nextStart = nextCurrent < start ? prev : start;
        this.setState({
            emojiNavigation: {
                ...this.state.emojiNavigation,
                pid: optionJSON[nextCurrent].pid || 0,
                start: nextStart,
                current: nextCurrent,
            },
        });
    };

    handleOnClickStickerNavNext = () => {
        const {optionJSON} = this.props.emoji;
        const {start, current, length} = this.state.emojiNavigation;
        let next = start + 1;
        if (next >= optionJSON.length) next = optionJSON.length - 1;
        const nextCurrent = current + 1;
        const nextStart = nextCurrent > start + length - 1 ? next : start;
        this.setState({
            emojiNavigation: {
                ...this.state.emojiNavigation,
                pid: optionJSON[nextCurrent].pid || 0,
                start: nextStart,
                current: nextCurrent,
            },
        });
    };

    handleOnClickStickerTab = (pid, index) => {
        this.setState({
            emojiNavigation: {
                ...this.state.emojiNavigation,
                pid,
                current: index,
            },
        });
    };

    handleOnClickSticker = (name) => {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const text = this.textarea.value;
        const f = text.substr(0, start);
        const b = text.substr(end);
        this.textarea.value = f.concat(name, b);
        this.textarea.focus();
        this.textarea.selectionEnd = f.length + name.length;
    };

    handleOnKeyDown = ({ctrlKey, keyCode, key}) => {
        if (keyCode === 91 || keyCode === 93) {
            this.onCommandDown = true;
        }
        if (ctrlKey && key === 'Enter' || (this.onCommandDown && key === 'Enter')) {
            this.handleSendReply();
        }
    };

    handleOnKeyUp = ({ctrlKey, key, keyCode}) => {
        if (this.onCommandDown && (keyCode === 91 || keyCode === 93 || keyCode === 224 || keyCode === 17)) this.onCommandDown = false;
    };

    handleSendReply = () => {
        const {oid, parent, root, name} = this.props;
        let {value} = this.textarea;
        value = value.replace('【', '[').replace('】', ']');
        const message = name ? `回复 @${name} :${value}` : value;
        const {csrf} = this.props.user;
        value && this.props.dispatch({
            type: 'comments/sendReply', payload: {root, parent, message, oid, csrf},
        });
        this.setState({tempMessage: value}, () => {
            this.textarea.value = '';
        });
    };

    renderEmojis = (emojis, isText) => emojis.map((emoji) => {
        if (isText) return <span key={emoji} className="sticker text" title={emoji} onClick={() => this.handleOnClickSticker(emoji)}>{emoji}</span>;
        else {
            const {url, name, remark} = emoji;
            return <Image
                key={name}
                className="sticker img"
                url={url}
                sign={name}
                remark={remark}
                onClick={() => this.handleOnClickSticker(name)}/>;
        }
    });

    render() {
        const {on, emojiNavigation, tempMessage} = this.state;
        const {start, length, pid, current} = emojiNavigation;
        const {comments, name, user, emoji, global, able = true} = this.props;
        const {error, sending} = comments.status.editor;
        const {optionJSON} = emoji;
        const canUse = !!user.info;
        const {face, uid} = user.info || {};
        return (
            <CommentEditorWrapper canUse={canUse}>
                {(!canUse || sending || !able) && (
                    <div className="mask">
                        <span>~
                            {!able && '评论功能已被禁止'}
                            {!global.status.connected && '未连接助手'}
                            {!canUse && global.status.connected && '尚未登录'}
                            {sending && '发送中'}
                            ~</span>
                    </div>
                )}
                <div className="header">
                    {canUse && <Image className={'avatar'} url={face} sign={uid}/>}
                </div>
                <div className="main">
                    <div className="send-box">
                        <textarea
                            autoFocus={true}
                            disabled={!canUse}
                            ref={i => this.textarea = i}
                            placeholder={name && !global ? `回复 @${name}` : '请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。'}
                            defaultValue={error ? tempMessage : ''}
                            onKeyUp={this.handleOnKeyUp}
                            onKeyDown={this.handleOnKeyDown}
                        />
                        <button disabled={sending || !canUse} onClick={this.handleSendReply}>发送</button>
                    </div>
                    <div className="toolbar">
                        <button disabled={!canUse} className="stickers-btn" onClick={this.handleOnClickStickersBtn} open={on}>STICKERS</button>
                        {on && <div className="stickers-box">
                            <div className="stickers">{optionJSON[current] && this.renderEmojis(optionJSON[current].emojis, pid === 0)}</div>
                            <div className="stickers-nav">
                                {start > 0 && <div className="tab-btn" onClick={this.handleOnClickStickerNavPrev}>PREV</div>}
                                {optionJSON.map(({pid, emojis, pname, purl}, index) => {
                                    if (index < start + length && index > start - 1) {
                                        return (
                                            <div key={pid} on={current === index ? '1' : '0'} onClick={() => this.handleOnClickStickerTab(pid, index)}>
                                                <Image url={purl} sign={`default-emoji-tab-${pid}`}/>
                                            </div>
                                        );
                                    }
                                })}
                                {start + length < optionJSON.length && <div className="tab-btn" onClick={this.handleOnClickStickerNavNext}>NEXT</div>}
                            </div>
                        </div>}
                        {error && <span className="send-error">{error}</span>}
                    </div>
                </div>
            </CommentEditorWrapper>
        );
    }
}

export default connect(({user, emoji, comments, global}) => ({user, emoji, comments, global}))(CommentEditor);
