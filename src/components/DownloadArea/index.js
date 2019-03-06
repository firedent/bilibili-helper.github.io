/**
 * Author: DrowsyFlesh
 * Create: 2019/3/4
 * Description:
 */
import React from 'react';
import styled from 'styled-components';
import WEBSITE_CONFIG from 'JSON/config';
import DOWNLOADS_CONFIG from 'JSON/downloads.json';

const {lastVersion} = WEBSITE_CONFIG;

const DownloadAreaWrapper = styled.div`
  width: 800px;
  margin: 10px auto 20px;
  h3 {
    display: flex;
    align-items: center;
    margin: 15px 0 20px;
    font-size: 16px;
    color: #212121;
    .sub-title {
      font-size: 10px;
      font-weight: 400;
      margin-left: 20px;
      color: var(--content-color);
    }
  }
  header {
    margin-bottom: 7px;
  }
  ol {
    //height: 180px;
    //border: 10px solid var(--border-color);
    padding: 10px;
    border-radius: 3px;
    //box-shadow: rgba(20,20,20,0.1) 0px 0px 10px;
    //background-color: var(--border-color);
    overflow: auto;
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
    
  }
  .info-item {
    margin-left: 20px;
    padding: 4px 0;
    font-size: 12px;
    text-indent: 5px;
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
    }
    &::after {
      content: ';';
      display: inline;
    }
    &:last-of-type::after {
      content: '。';
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
        let i = 0;
        const firstVersion = _.find(DOWNLOADS_CONFIG, ({version, url}) => url).version;
        this.downloadThree = [];
        this.restVersion = [];
        _.forEach(DOWNLOADS_CONFIG, (data) => {
            const {url} = data;
            if (url && i < 3) {
                i += 1;
                this.downloadThree.push(data);
            } else this.restVersion.push(data);
        });
        this.state = {
            tabVersion: firstVersion,
            showMoreVersion: false,
        };
    }

    handleOnClickTab = (version) => {
        this.setState({tabVersion: version});
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
            default:
                return '';
        }
    };

    getVersionTypeIcon = (sign) => {
        switch (sign) {
            case 'store':
                return <img src="../static/icons/google_favicon.ico"/>;
            case 'test':
                return 'test ';
            default:
                return '';
        }
    };

    render() {
        const {tabVersion, showMoreVersion} = this.state;
        return (
            <DownloadAreaWrapper id="downloadArea">
                <h3>下载助手 ~ DOWNLOAD<span className="sub-title">旧版本不提供下载方式</span></h3>

                <div className="tab-bar">
                    <div className="versions">
                        {this.downloadThree.map(({version, sign, url}) => (
                            url && (
                                <DownloadButton
                                    key={version}
                                    className={`download-btn ${version === tabVersion && 'active'}`}
                                    onClick={() => this.handleOnClickTab(version)}
                                >
                                    <span>{this.getVersionTypeString(sign)} {version}</span>
                                    {version === tabVersion && (
                                        <a href={url}>
                                            <i className="download-btn">Click here to download</i>
                                        </a>)}
                                </DownloadButton>
                            )
                        ))}
                    </div>
                    <div className="more-version-box">µ
                        <button className={`more-version-btn ${showMoreVersion && 'active'}`} onClick={this.handleOnClickMoreVersion}>More Version</button>
                        {showMoreVersion && <ul>
                            {this.restVersion.map(({version, url, sign}) => (

                                <li
                                    className={`${version === tabVersion && 'active'}`}
                                    key={version} onClick={() => this.handleOnClickTab(version)}
                                >
                                    {this.getVersionTypeIcon(sign)}
                                    {version}
                                </li>
                            ))}
                        </ul>}
                    </div>
                </div>
                <div className="tab-contents">
                    {DOWNLOADS_CONFIG.map(({version, url, info}) => (
                        tabVersion === version && (<ol key={version}>
                            {info.map((line, index) => (
                                <li
                                    key={index}
                                    className="info-item"
                                    dangerouslySetInnerHTML={{__html: line[1]}}
                                />
                            ))}
                        </ol>)),
                    )}
                </div>

                {/*</ol>*/}
            </DownloadAreaWrapper>
        );
    }
}

export default DownloadArea;
