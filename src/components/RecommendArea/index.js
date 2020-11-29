/**
 * Author: DrowsyFlesh
 * Create: 2019/3/4
 * Description:
 */
import Image from 'Components/Image';
import _ from 'lodash';
import React from 'react';
import {connect} from 'dva';
import styled from 'styled-components';
import Page from 'Components/Page';

//import sliderImage1 from 'Static/slider/1.png';

const RecommendWrapper = styled(Page)`
  h3 {
    margin: 15px 0 10px;
    font-size: 16px;
  }
  header {
    font-size: 14px;
    margin-top: 10px;
  }
  .item {
    padding-left: 10px;
    header {
      color: var(--content-color);
    }
    .content {
      li {
        a {
          display: flex;
          align-items: center;
          padding: 7px 10px;
        }
        img {
          margin-right: 12px;
          vertical-align: middle;
        }
        .info h6 {
          font-size: 14px;
        }
        span {
          margin-right: 24px;
        }
      }
    }
  }
  ul {
    padding: 5px 1px;
    border-radius: 3px;
    z-index: 101;
    li {
      margin-bottom: 6px;
      font-size: 12px;
      list-style: none;
      //cursor: pointer;
      border-radius: 3px;
      border: 1px solid var(--border-color);
      transition: all 0.1s;
      //&:hover, &.active {
      //  background-color: var(--bilibili-blue);
      //  color: var(--pure-white);
      //}
      i {
        margin: 0 3px;
        font-style: normal;
        color: var(--bilibili-pink);
      }
      a {
        right: calc(100% + 25px);
        color: var(--bilibili-blue);
        text-decoration: none;
      }
    }
  }
`;

const PakkuImage = styled.img`
  background-color: #fff;
  border-radius: 50%;
  padding: 1px;
  width: 34px;
`;

class RecommendArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <RecommendWrapper id="announcement">
                <h3>相关软件推荐 ~ RECOMMEND</h3>
                <div className="item">
                    <ul className="content">
                        <li>
                            <a href="https://s.xmcp.ml/pakkujs/?src=helper" target="_blank">
                                <PakkuImage src="https://s.xmcp.ml/pakkujs/icon_display.png"/>
                                <div className="info">
                                    <h6>Pakku：哔哩哔哩弹幕过滤器</h6>
                                    <p>弹幕复读不能忍？使用<i>哔哩哔哩弹幕过滤器</i>，还你清爽的弹幕体验~</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </RecommendWrapper>
        );
    }
}

export default connect(({announcements}) => ({announcements}))(RecommendArea);
