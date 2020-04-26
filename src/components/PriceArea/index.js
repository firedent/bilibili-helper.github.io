/**
 * Author: DrowsyFlesh
 * Create: 2020/4/26
 * Description:
 */
import Image from 'Components/Image';
import {connect} from 'dva';
import React from 'react';
import styled from 'styled-components';
import Page from '../Page';
import withRouter from 'umi/withRouter';

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
      color: #fff;
      font-weight: normal;
      margin-bottom: 12px;
      
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

const BuyBtn = styled.button`
  margin-left: auto;
  padding: 0 32px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
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

    handleOnClickByBtn = () => {
        //const {global, user} = this.props;
        //console.log(global, user);
        alert('支付功能目前正在开发中，尽情留意各渠道通知，敬请期待');
    }

    render() {
        return (
            <Wrapper id="priceWrapper">
                <PriceBox>
                    <div className="description">
                        <h2>「 赞助一瓶可乐，不再白嫖 」</h2>
                        <p>立即获得限时体验「多账号同时登陆」与「配置同步」功能的资格</p>
                    </div>
                    <BuyBtn onClick={this.handleOnClickByBtn}><span className="price">￥2/月</span> 立即订阅</BuyBtn>
                </PriceBox>
            </Wrapper>
        );
    }
}

export default withRouter(connect(({global, user}) => ({global, user}))(PriceArea));
