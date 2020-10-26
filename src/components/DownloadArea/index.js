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

const DownloadAreaWrapper = styled(Page)`
  ol {
    padding: 10px;
    border-radius: 3px;
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
  .tab-contents {
    ul {
      margin-top: 10px;
      list-style: none;
      .info-item {
        margin: 0 20px;
        padding: 5px 4px;
      }
    }
    .important, .important:hover {
      background-color: var(--bilibili-pink);
      color: var(--pure-white);
      i {
        color: var(--pure-white);
        font-weight: bold;
      }
    }
  }
  .info-item {
    position: relative;
    padding: 5px 0 5px 30px;
    font-size: 12px;
    border-radius: 3px;
    //border-bottom: 1px solid var(--pure-white);
    border-bottom: 1px solid var(--border-color);
    transition: background-color 0.15s;
    &:last-of-type {
      border:none;
    }
    &:hover, &.active {
      background-color: #eee;
    }
    i {
      margin: 0 3px;
      font-style: normal;
      color: var(--bilibili-pink);
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
      right: calc(100% + 5px);
      color: var(--bilibili-blue);
      text-decoration: none;
    }
  }
`;

const DownloadButton = styled.button`
  position: relative;
  width: 200px;
  height: 50px;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 10px;
  box-sizing: border-box;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid var(--border-color);
  background-color: white;
  cursor: pointer;
  outline: none;
  transition: all 0.15s;
  &:last-of-type {
    margin-right: 0;
  }
  &:hover {
    color: var(--bilibili-blue);
    border: 1px solid var(--bilibili-blue);
  }
  &::after {
    display: block;
    position: absolute;
    bottom: -6px;
    left: calc(50% - 7.07px);
    width: 10px;
    height: 10px;
    border: 1px solid var(--bilibili-blue);
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
  }
  &:not(.active)::after {
    background-color: white;
  }
  &:active::after, &.active::after {
    background-color: var(--pure-white);
  }
  &.active::after {
    content: ' ';
  }
  &:active, &.active {
    opacity: 1;
    border: 1px solid var(--bilibili-blue);
    background-color: var(--bilibili-blue);
    background: linear-gradient(90deg, var(--bilibili-blue), #45b8e6 100%);
    color: var(--background-color);
  }
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &.active span {
    top: -5px;
  }
  span {
    display: block;
    position: relative;
    top: 0;
    font-weight: normal;
    user-select: none;
  }
  .download-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 3px;
    font-size: 10px;
    font-style: unset;
    background-color: var(--pure-white);
    color: var(--content-color);
    z-index: 1;
    transition: background-color 0.1s;
    &:hover {
      //box-shadow: rgba(20, 20, 20, 0.1) 1px 1px 10px;
      background-color: #eee;
    }
  }
`;

class DownloadArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabVersion: null,
            showMoreVersion: false,
            downloadThree: null,
            restVersion: null,
        };
    }

    componentDidMount() {
        const {global} = this.props;
        const {firstVersion, downloadThree, restVersion} = this.state;
        if (global.downloads && (!firstVersion && !downloadThree && !restVersion)) {
            this.updateDownloads(global.downloads);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {global} = this.props;
        const {firstVersion, downloadThree, restVersion} = this.state;
        if (global.downloads && (!firstVersion && !downloadThree && !restVersion)) {
            this.updateDownloads(global.downloads);
        }
    }

    updateDownloads = (downloads) => {
        const {version: firstVersion, sign} = _.find(downloads, ({version, url}) => url);
        const downloadThree = [];
        const restVersion = [];
        let i = 0;
        _.forEach(downloads, (data) => {
            const {url, available = false} = data;
            if (url && i < 3 && available) {
                i += 1;
                downloadThree.push(data);
            } else restVersion.push(data);
        });
        this.setState({
            tabVersion: firstVersion,
            tabSign: sign,
            downloadThree,
            restVersion,
        });
    };

    handleOnClickTab = (version, sign) => {
        this.setState({tabVersion: version, tabSign: sign});
    };

    handleOnClickMoreVersion = () => {
        this.setState({showMoreVersion: !this.state.showMoreVersion});
    };

    getVersionTypeString = (sign) => {
        switch (sign) {
            case 'store':
                return 'Google Web Store';
            case 'test':
                return '测试版';
            case 'edge':
                return 'Edge Addons';
            case 'music':
                return 'Bilibili Music';
            case 'music-test':
                return 'Bilibili Music 测试版';
            default:
                return '';
        }
    };

    getVersionTypeIcon = (sign) => {
        switch (sign) {
            case 'store':
                return <img src="../static/icons/google_favicon.ico"/>;
            case 'edge':
                return <img src="../static/icons/edge_favicon.ico"/>;
            case 'test':
                return <img src="../static/icons/bug.png"/>;
            default:
                return '';
        }
    };

    render() {
        const {global} = this.props;
        const {
            tabVersion,
            tabSign,
            showMoreVersion,
            downloadThree,
            restVersion,
        } = this.state;
        return (
            <DownloadAreaWrapper id="downloadArea">
                <Header>
                    下载助手 ~ DOWNLOAD
                    <a href="https://www.bilibili.com/video/av44808808" target="_blank">功能介绍</a>
                    <a href="https://github.com/bilibili-helper/bilibili-helper/wiki/%E5%A6%82%E4%BD%95%E4%B8%8B%E8%BD%BD%E5%92%8C%E5%AE%89%E8%A3%85%EF%BC%9F#%E5%A6%82%E4%BD%95%E5%AE%89%E8%A3%85"
                       target="_blank">安装方法</a>
                    <p className="sub-title">
                        安装测试版本的话，需要使用特殊的方法进行安装，具体请查看"安装方法"
                        <br/>旧版本不提供下载地址哟~</p>
                </Header>
                <div className="tab-bar">
                    <div className="versions">
                        {downloadThree && downloadThree.map(({version, sign, url}) => (
                            url && (
                                <DownloadButton
                                    key={version}
                                    className={`download-btn ${version === tabVersion && sign === tabSign && 'active'}`}
                                    onClick={() => this.handleOnClickTab(version, sign)}
                                >
                                    <span>{this.getVersionTypeString(sign)} {version}</span>
                                    {version === tabVersion && sign === tabSign && (
                                        <a href={url} download target="_blank">
                                            <i className="download-btn">Click here to download</i>
                                        </a>)}
                                </DownloadButton>
                            )
                        ))}
                    </div>
                    <div className="more-version-box">
                        <button className={`more-version-btn ${showMoreVersion && 'active'}`} onClick={this.handleOnClickMoreVersion}>More Version</button>
                        {showMoreVersion && <ul>
                            {restVersion && restVersion.map(({version, url, sign}) => (

                                <li
                                    className={`${version === tabVersion && sign === tabSign && 'active'}`}
                                    key={version} onClick={() => this.handleOnClickTab(version, sign)}
                                >
                                    {this.getVersionTypeIcon(sign)}
                                    {version}
                                </li>
                            ))}
                        </ul>}
                    </div>
                </div>
                <div className="tab-contents">
                    {global.downloads && global.downloads.map(({version, sign, url, notify, info}) => ([
                        tabVersion === version && sign === tabSign && notify && (<ul key={version + '-notify'}>
                            {notify.map((line, index) => (
                                <div className={`info-item ${line[0]}`} key={index}>
                                    <li dangerouslySetInnerHTML={{__html: line[1]}}/>
                                    {line[2] !== undefined && (
                                        <a
                                            target="_blank"
                                            href={`https://github.com/bilibili-helper/bilibili-helper/issues/${line[2]}`}
                                        >#{line[2]}</a>
                                    )}
                                </div>
                            ))}
                        </ul>),
                        tabVersion === version && sign === tabSign && (<ol key={version}>
                            {info.map((line, index) => (
                                <div className={`info-item ${line[0]}`} key={index}>
                                    <li dangerouslySetInnerHTML={{__html: line[1]}}/>
                                    {line[2] !== undefined && (
                                        <a
                                            target="_blank"
                                            href={`https://github.com/bilibili-helper/bilibili-helper/issues/${line[2]}`}
                                        >#{line[2]}</a>
                                    )}
                                </div>
                            ))}
                        </ol>),
                    ]))}
                </div>
            </DownloadAreaWrapper>
        );
    }
}

export default connect(({global}) => ({global}))(DownloadArea);
