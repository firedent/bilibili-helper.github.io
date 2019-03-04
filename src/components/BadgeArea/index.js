/**
 * Author: DrowsyFlesh
 * Create: 2019/3/4
 * Description:
 */
import React from 'react';
import styled from 'styled-components';

const InfoWrapper = styled.div`
  width: 800px;
  height: 20px;
  margin: 50px auto 20px;
  & > * {
    display: inline-block;
    margin-right: 5px;
    height: 20px;
  }
`;

export default class BadgeArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <InfoWrapper>
                <a href="https://github.com/bilibili-helper/bilibili-helper/blob/master/LICENSE" target="_blank">
                    <img src="https://img.shields.io/github/license/mashape/apistatus.svg?style=social" alt="LICENSE"/>
                </a>
                <a href="https://chrome.google.com/webstore/detail/kpbnombpnpcffllnianjibmpadjolanh" target="_blank">
                    <img src="https://img.shields.io/chrome-web-store/v/kpbnombpnpcffllnianjibmpadjolanh.svg?style=social" alt="Chrome Web Store"/>
                </a>
                <a href="https://chrome.google.com/webstore/detail/kpbnombpnpcffllnianjibmpadjolanh" target="_blank">
                    <img src="https://img.shields.io/chrome-web-store/d/kpbnombpnpcffllnianjibmpadjolanh.svg?style=social" alt="Users"/>
                </a>
                <iframe
                    src="https://ghbtns.com/github-btn.html?user=bilibili-helper&repo=bilibili-helper&type=star&count=true"
                    frameBorder="0"
                    scrolling="0"
                    width="170px"
                    height="20px"></iframe>
            </InfoWrapper>
        );
    }
}
