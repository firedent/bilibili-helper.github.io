

/**
 * Author: DrowsyFlesh
 * Create: 2019/3/9
 * Description:
 */
import React from 'react';
import {connect} from 'dva';
import styled from 'styled-components';
import {Header} from 'Components/Header';
import Image from 'Components/Image';
import Page from 'Components/Page';
import {List} from 'react-virtualized';

const FeedAreaWrapper = styled(Page)`
  position: relative;
  img {
    position: absolute;
    top: 102px;
    right: -180px;
    width: 160px;
    user-select: none;
    pointer-events: none;
    filter: brightness(0) grayscale(1);
  }
  a {
    margin-left: 0;
    padding: 0 6px;
    line-height: 16px;
    border: none;
    text-decoration: underline;
  }
`;

const FeedList = styled(List)`
  border-radius: 3px;
  outline: none;
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 6px;
  font-size: 12px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--border-color);
  border-radius: 3px;
  background-color: var(--font-color-white);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: var(--background-color);
  }
  &.largeThanTen {
    color: var(--bilibili-pink);
  }
  &.largeThanFive {
    color: var(--bilibili-blue);
  }
  & > * {
    padding: 0 2px 0 5px;
    width: 80px;
    border-right: 1px solid var(--border-color);
    &:last-of-type {
      border-right: none;
    }
  }
  .date {
  }
  .name {
    width: 40px;
    text-align: center;
  }
  .num {
    text-align: right;
    padding-right: 20px;
    width: 60px;
  }
  .message {
    flex-grow: 1;
  }
  .replay {
    flex-grow: 1;
  }
`;

class FeedArea extends React.Component {
    constructor(props) {
        super(props);
    }

    renderLine = ({index, style}) => {
        const {global} = this.props;
        const [date, name, num, message, replay] = global.feeds[index];
        const largeThanTen = num >= 10;
        const largeThanFive = num >= 5 && num < 10;
        return <Line style={style} key={index} className={`${largeThanFive ? 'largeThanFive': (largeThanTen ? 'largeThanTen': '')}`}>
            <span className="date">{date}</span>
            <span className="name">{name}</span>
            <span className="num">￥ {Number(num).toFixed(2)}</span>
            <span className="message">{message}</span>
            <span className="replay">{replay}</span>
        </Line>;
    };

    render() {
        const {global} = this.props;
        return (
            <FeedAreaWrapper>
                <Header>
                    投喂区鸭 ~ SPONSORS
                    <p>感谢大家的支持鸭~mua~</p>
                    <p>如果觉得助手用起来还不错，恳请前往<a href="https://chrome.google.com/webstore/detail/%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9%E5%8A%A9%E6%89%8B%EF%BC%9Abilibilicom-%E7%BB%BC%E5%90%88%E8%BE%85%E5%8A%A9%E6%89%A9%E5%B1%95/kpbnombpnpcffllnianjibmpadjolanh?hl=zh-CN">谷歌商店</a>给予五星好评~从而让更多人知道~</p>
                </Header>
                <FeedList
                    width={800}
                    height={200}
                    rowCount={(global.feeds && global.feeds.length) || 0}
                    rowHeight={28}
                    rowRenderer={this.renderLine}
                    noRowsRenderer={() => (<div>无数据</div>)}
                />
                <Image src="../static/images/alipay-df.png"/>
            </FeedAreaWrapper>
        );
    }
}

export default connect(({global}) => ({global}))(FeedArea);
