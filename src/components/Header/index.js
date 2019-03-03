/* global lastVersion */
/**
 * Author: DrowsyFlesh
 * Create: 2019/3/3
 * Description:
 */
import React from 'react';
import {connect} from 'dva';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  min-width: 800px;
  background-color: var(--bilibili-pink);
  color: var(--background-color);
  padding: 50px 0px 20px;
  overflow: hidden;
  & > * {
    display: block;
    max-width: 800px;
    margin: 0px auto;
    padding: 0px 10px;
  }
  .header-box {
    display: flex;
    justify-content: space-between;
    height: 80px;
    .title-box {
      header {
        font-size: 30px;
      }
      .version-box {
        height: 12px;
        line-height: 12px;
        text-indent: 2px;
        span {
          margin-right: 20px;
          line-height: 12px;
          font-size: 12px;
          font-weight: normal;
        }
      }
    }
    .action-box {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .login-box {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        & > * {
          flex-grow: 0;
          width: max-content;
        }
        span {
          font-size: 12px;
          margin-top: 3px;
          text-align: right;
        }
        .login-btn {
          padding: 10px 40px;
          border-radius: 3px;
          font-size: 14px;
          letter-spacing: 2px;
          border: 1px solid var(--background-color);
          background-color: var(--bilibili-blue);
          color: var(--background-color);
          outline: none;
          cursor: pointer;
          &:hover {
            background-color: rgba(35, 173, 229, 0.9);
          }
          &:active {
            background-color: var(--bilibili-blue);
          }
          &[disabled] {
            background-color: rgba(35, 173, 229, 0.5);
            cursor: not-allowed;
          }
        }
      }
    }
  }
`;

const InfoWrapper = styled.div`
  //position: absolute;
  //bottom: 5px;
  //left: calc(50% - 410px);
  //width: 800px;
  margin-top: 5px;
  & > * {
    margin-right: 5px;
  }
`;

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    handleOnClickLogin = (init, tryConnect) => {
        if (!init && !tryConnect) this.props.dispatch({type: 'global/connectHelper'});
        else location.href = location.href;
    };

    render() {
        const {global} = this.props;
        const {init, tryConnect} = global.status;
        return (
            <HeaderWrapper>
                <div className="header-box">
                    <div className="title-box">
                        <header>BILIBILI HELPER</header>
                        <div className="version-box">
                            <span>Last: {lastVersion}</span>
                            {global.version && <span>You: {global.version}</span>}
                        </div>
                    </div>
                    <div className="action-box">
                        {!init ? (
                            <div className="login-box">
                                <button
                                    className="login-btn"
                                    onClick={() => this.handleOnClickLogin(init, tryConnect)}
                                >{!init && !tryConnect ? '连接助手' : '连接助手失败，点击刷新重试'}</button>
                                {(!init && !tryConnect) && <span>如果您的浏览器未安装助手或版本小于1.2.0<br/>连接将会失败</span>}
                            </div>
                        ) : (
                             null
                         )}
                    </div>
                </div>
                <InfoWrapper>
                    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="LICENSE"/>
                    <img src="https://img.shields.io/chrome-web-store/v/kpbnombpnpcffllnianjibmpadjolanh.svg" alt="Chrome Web Store"/>
                    <img src="https://img.shields.io/chrome-web-store/d/kpbnombpnpcffllnianjibmpadjolanh.svg" alt="Users"/>
                </InfoWrapper>
            </HeaderWrapper>
        );
    }
}

export default connect(({global, user}) => ({global, user}))(Header);
