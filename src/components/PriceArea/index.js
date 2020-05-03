/**
 * Author: DrowsyFlesh
 * Create: 2020/4/26
 * Description:
 */
import {connect} from 'dva';
import React from 'react';
import styled from 'styled-components';
import Page from '../Page';
import withRouter from 'umi/withRouter';
import {router} from 'umi';

const Wrapper = styled(Page)`
  
`;

const PriceBox = styled.div`
  display: flex;
  margin: 0 20px;
  padding: 16px;
  //border: 1px solid;
  border-radius: 4px;
  background: linear-gradient(to right, #ff006a, #a203a5);
  
  .description {
    h2 {
      margin-bottom: 12px;
      font-weight: normal;
      text-indent: -14px;
      color: #fff;
      
      img {
        width: 28px;
        margin: -2px;
        vertical-align: text-bottom;
      }
    }
  
    p {
      font-size: 14px;
      color: #eee;
    }
  }
`;

const BuyBtn = styled.a`
  margin-left: auto;
  padding: 0 32px;
  line-height: 65px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  transition: background-color 300ms;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .price {
    margin-right: 12px;
  }
`;

class PriceArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Wrapper id="priceWrapper">
                <PriceBox>
                    <div className="description">
                        <h2>「 赞助一瓶可乐，使用更加方便 」</h2>
                        <p>立即获得限时体验「多账号同时登陆」与「配置同步」功能的资格</p>
                    </div>
                    <BuyBtn href="/product">查看详情</BuyBtn>
                </PriceBox>
            </Wrapper>
        );
    }
}

export default withRouter(connect(({global, user}) => ({global, user}))(PriceArea));
