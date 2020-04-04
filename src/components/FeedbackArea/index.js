/**
 * Author: DrowsyFlesh
 * Create: 2019/3/4
 * Description:
 */
import React from 'react';
import styled from 'styled-components';
import {Header} from 'Components/Header';
import Page from 'Components/Page';

const FeedbackWrapper = styled(Page)`
  .wrapper {
    
  }
  a {
    display: inline-block;
    margin: 3px 5px;
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 3px;
    text-decoration: none;
    background-color: #ef6c00;
    color: var(--pure-white);
    user-select: none;
    &:last-of-type {
      margin-right: 0;
    }
    &:hover {
      opacity: 0.9;
    }
    &:active {
      opacity: 1;
    }
    img, .github-svg {
      width: 15px;
      vertical-align: middle;
      fill: currentColor;
    }
  }
  .github {
    background-color: #222;
  }
  .qq {
    background-color: #11abff;
  }
  .telegram {
    background-color: #0095e6;
  }
  .comments {
    background-color: var(--bilibili-pink);
  }
  
`;
export default () => (
    <FeedbackWrapper>
        <Header>
            问题反馈 ~ FEEDBACK
            <p>赶紧留言吧~想说什么都可以~</p>
        </Header>
        <div className="wrapper">
            <a className="comments">「评论区」留言</a>
            <a className="github" href="https://github.com/bilibili-helper/bilibili-helper/issues" target="_blank">「Github」上反馈</a>
            <a href="https://weibo.com/guguke" target="_blank">「微博」@啾咕咕www</a>
            <a href="https://weibo.com/ruo0037" target="_blank">「微博」@没睡醒的肉啊</a>
            <a className="qq">在「QQ群548321019」私聊 肉肉</a>
            <a className="qq" target="_blank" href="https://t.me/bilibili_helper">点击加入「Telegram频道」</a>
        </div>
    </FeedbackWrapper>
)
