/**
 * Author: DrowsyFlesh
 * Create: 2019/3/4
 * Description:
 */
import React from 'react';
import styled from 'styled-components';

const FeedbackWrapper = styled.div`
  width: 800px;
  margin: 10px auto;
  h3 {
    margin: 15px 0 20px;
    font-size: 16px;
    color: #212121;
  }
  a {
    display: inline-block;
    margin: 3px 5px;
    padding: 6px 18px;
    font-size: 12px;
    border-radius: 3px;
    text-decoration: none;
    background-color: #ef6c00;
    color: var(--pure-white);
    user-select: none;
    &:first-of-type {
      margin-left: 0;
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
`;
export default () => (
    <FeedbackWrapper>
        <h3>问题反馈 ~ FEEDBACK</h3>
        <a className="github" href="https://github.com/bilibili-helper/bilibili-helper/issues" target="_blank">在「GITHUB」上反馈（推荐）</a>
        <a href="https://weibo.com/guguke" target="_blank">在「微博」@啾咕咕www</a>
        <a href="https://weibo.com/ruo0037" target="_blank">在「微博」@没睡醒的肉啊</a>
        <a className="qq">在「QQ群548321019」私聊 肉肉</a>
    </FeedbackWrapper>
)
