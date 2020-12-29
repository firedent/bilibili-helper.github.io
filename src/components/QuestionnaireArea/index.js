import _ from 'lodash';
import styled from 'styled-components';
import React from 'react';

const Wrappr = styled.div`
  width: 800px;
  margin: 10px auto 30px;
  padding: 0px 10px;
  h3 {
    margin: 15px 0 10px;
    font-size: 16px;
  }
  
  p {
    margin: 0 20px 8px;
    padding: 5px 4px;
    border-radius: 3px;
    font-size: 12px;
    background-color: var(--bilibili-pink);
    color: var(--font-color-white);
  }
  
  a {
    color: var(--font-color-white);
  }
  .important {
    background-color: red;
    color: yellow;
  }
`;

/**
 * Author: DrowsyFlesh
 * Create: 2019/11/4
 * Description:
 */
class QuestionnaireArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Wrappr id="announcement">
                <h3>问卷调查 ~ QUESTIONNAIRE</h3>
                <p>哔哩哔哩助手2.0+ 功能清单：<a target="_blank" href="https://shimo.im/docs/ypGHYjwdwrv3hXr9">石墨文档</a>，测试群：677639415，无法1.x+版本文件</p>
                <p>视频下载方式：<a target="_blank" href="https://shimo.im/docs/PXgDrXTGcXjtWjVX#anchor-Fnmu">石墨文档</a></p>
                <p>如果觉得助手用起来还不错，恳请前往 <a target="_blank" href="https://chrome.google.com/webstore/detail/%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9%E5%8A%A9%E6%89%8B%EF%BC%9Abilibilicom-%E7%BB%BC%E5%90%88%E8%BE%85%E5%8A%A9%E6%89%A9%E5%B1%95/kpbnombpnpcffllnianjibmpadjolanh?hl=zh-CN">&nbsp;谷歌商店&nbsp;</a> 给予五星好评~从而让更多人知道~</p>
            </Wrappr>
        );
    }
}

export default QuestionnaireArea;
