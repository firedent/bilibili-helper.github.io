/**
 * Author: DrowsyFlesh
 * Create: 2019/3/4
 * Description:
 */
import React from 'react';
import {connect} from 'dva';
import styled from 'styled-components';
import {Header} from 'Components/Header';
import Page from 'Components/Page';

const WebsiteUpdateAreaWrapper = styled.div`
  ol {
    //height: 180px;
    //border: 10px solid var(--border-color);
    padding: 10px;
    border-radius: 3px;
    //box-shadow: rgba(20,20,20,0.1) 0px 0px 10px;
    //background-color: var(--border-color);
  }
  .tab-bar {
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
    .more-version-box {
      display: flex;
      position: relative;
      .more-version-btn {
        margin-bottom: 5px;
        margin-left: 3px;
        padding: 3px 8px;
        border: 1px solid var(--border-color);
        border-radius: 3px;
        background-color: var(--pure-white);
        align-self: flex-end;
        outline: none;
        user-select: none;
        cursor: pointer;
        transition: all 0.15s;
        &:hover {
          color: var(--bilibili-blue);
          border: 1px solid var(--bilibili-blue);
        }
        &:active, &.active {
          opacity: 1;
          background-color: var(--bilibili-blue);
          color: var(--background-color);
        }
        &[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
      ul {
        position: absolute;
        top: calc(100% - 4px);
        right: 1px;
        width: max-content;
        padding: 5px 1px;
        border-radius: 3px;
        background-color: var(--pure-white);
        box-shadow: rgba(20, 20, 20, 0.1) 1px 1px 10px;
        z-index: 101;
        li {
          padding: 2px 10px;
          font-size: 12px;
          text-align: right;
          list-style: none;
          cursor: pointer;
          transition: all 0.1s;
          &:hover, &.active {
            background-color: var(--bilibili-blue);
            color: var(--pure-white);
          }
          img {
            width: 14px;
            margin-right: 3px;
            vertical-align: sub;
          }
        }
      }
    }
  }
  .tab-contents {}
  .info-item {
    position: relative;
    margin-left: 20px;
    padding: 5px 0 5px 5px;
    font-size: 12px;
    border-radius: 3px;
    //border-bottom: 1px solid var(--pure-white);
    border-bottom: 1px solid var(--border-color);
    &:last-of-type {
      border:none;
    }
    //&:hover, &.active {
    //  background-color: var(--bilibili-blue);
    //  color: var(--pure-white);
    //}
    i {
      margin: 0 3px;
      font-style: normal;
      color: var(--content-color);
    }
    li {
      padding-left: 5px;
    }
    & li::after {
      content: ';';
      display: inline;
    }
    &:last-of-type li::after {
      content: '。';
    }
    a {
      position: absolute;
      top: 5px;
      right: calc(100% + 25px);
      color: var(--bilibili-blue);
      text-decoration: none;
    }
  }
`;

class WebsiteUpdateArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {global} = this.props;
        return (
            <Page>
                <WebsiteUpdateAreaWrapper id="downloadArea">
                    <Header>
                        网站动态 ~ DYNAMIC FOR WEBSITE
                        <p className="sub-title">这里会不定期列出网站的更新动态~</p>
                    </Header>
                    <ol className="tab-contents">
                        {global.websiteUpdate && global.websiteUpdate.map((html, index) => (
                            <div className="info-item" key={index}>
                                <li dangerouslySetInnerHTML={{__html: html}}/>
                            </div>
                        ))}
                    </ol>
                </WebsiteUpdateAreaWrapper>
            </Page>
        );
    }
}

export default connect(({global}) => ({global}))(WebsiteUpdateArea);
