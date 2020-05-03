import {
    HeaderArea,
    GlobalStyleSheet,
    Footer,
    Page,
} from 'Components/index';
import {connect} from 'dva';
import React, {useState, useEffect, useCallback} from 'react';
import withRouter from 'umi/withRouter';
import styled from 'styled-components';

const CarouselWrapper = styled.div`
  flex-shrink: 0;
  position: relative;
  display: flex;
  width: 340px;
  height: 348px;
  margin: 0;
  border-radius: 4px;
  box-shadow: 0 0 11px 0 rgba(51,51,51,0.2);
  overflow: hidden;
  
  &:hover {
    .carousel-btn {
      opacity: 0.6;
    }
  }
  
  .img-wrapper {
    position: relative;
    width: 340px;
    box-sizing: border-box;
    transition: transform 500ms cubic-bezier(0.79, 0, 0.2, 1);
    
    p {
      position: absolute;
      bottom: 0px;
      width: 100%;
      padding: 12px;
      box-sizing: border-box;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.7);
      color: #eee;
    }
  }
  .carousel-btn {
    position: absolute;
    top: 120px;
    padding: 6px 12px;
    background-color: #fff;
    border-radius: 4px;
    font-size: 12px;
    box-shadow: 0 0 3px rgba(76, 76, 76, 0.2);
    cursor: pointer;
    user-select: none;
    opacity: 0;
    transition: opacity 300ms;
    &:hover {
      opacity: 1;
    }
  }
  .prev-btn {
    left: 6px;
  }
  .next-btn {
    right: 6px;
  }
`;

const SectionWrapper = styled(Page)`
    display: flex;
`;

const Description = styled.div`
  margin-left: 24px;
  width: 100%;
  
  h3 {
    margin-bottom: 6px;
    text-indent: -12px;
    color: #000000;
  }
  
  p {
    font-size: 12px;
    color: var(--bilibili-pink);
  }
  dl {
    dt {
      width: 420px;
      margin: 12px 0 6px;
      padding: 3px 6px;
      font-size: 12px;
      font-weight: bold;
      background-color: var(--border-color);
      border-radius: 4px;
    }
    dd {
      font-size: 12px;
      float: left;
      margin: 0px 8px 3px 0px;
      padding: 3px 6px;
      border-radius: 3px;
      cursor: default;
      transition: background-color 100ms, color 100ms;
      
      &:hover {
        color: var(--pure-white);
        background-color: var(--bilibili-pink);
      }
    }
  }
  .subscription-buttons {
    clear: both;
    button {
      margin-top: 6px;
      width: 100%;
      padding: 8px;
      font-size: 18px;
      border: none;
      border-radius: 4px;
      background-color: var(--bilibili-blue);
      color: var(--pure-white);
      cursor: pointer;
      outline: none;
      transition: filter 300ms;
      
      &:hover {
        filter: brightness(1.2);
      }
      
      &:active {
        filter: brightness(0.9);
      }
    }
  }
`;

const PriceAreaWrapper = styled.div`

`;

const PriceArea = () => {
    return (
        <PriceAreaWrapper>

        </PriceAreaWrapper>
    )
}

const Img = styled.img`
  width: 340px;
  //margin: 12px;
  //box-shadow: 0 0 11px 0 rgba(51, 51, 51, 0.2);
  pointer-events: none;
`;

const imgCounts = 4;
let timeIntervalNum = 0;
let intervalDuration = 4000;
let imgWidth = 340;
const Carousel = () => {
    const [currentIndex, setIndex] = useState(0);

    const handleOnLoop = useCallback(() => {
        if (currentIndex < imgCounts - 1) {
            setIndex(currentIndex + 1);
        } else {
            setIndex(0);
        }
    }, [currentIndex]);

    const handleOnCarouseMouseEnter = useCallback(() => {
        clearInterval(timeIntervalNum);
    }, [currentIndex]);

    const handleOnCarouseMouseLeave = useCallback(() => {
        clearInterval(timeIntervalNum);
        timeIntervalNum = setInterval(handleOnLoop, intervalDuration);
    }, [currentIndex]);

    const handleOnClickPrevBtn = useCallback(() => {
        if (currentIndex === 0) {
            setIndex(imgCounts - 1);
        } else {
            setIndex(currentIndex - 1);
        }
    }, [currentIndex]);

    const handleOnClickNectBtn = useCallback(() => {
        if (currentIndex === imgCounts - 1) {
            setIndex(0);
        } else {
            setIndex(currentIndex + 1);
        }
    }, [currentIndex]);

    useEffect(() => {
        clearInterval(timeIntervalNum);
        timeIntervalNum = setInterval(handleOnLoop, intervalDuration);
    }, [currentIndex]);

    return (
        <CarouselWrapper onMouseEnter={handleOnCarouseMouseEnter} onMouseLeave={handleOnCarouseMouseLeave}>
            <div className="img-wrapper" style={{transform: `translateX(${-currentIndex * imgWidth}px)`}}>
                <Img src="/static/images/popup1.jpg"/>
                <p>全新动态实时预览</p>
            </div>
            <div className="img-wrapper" style={{transform: `translateX(${-currentIndex * imgWidth}px)`}}>
                <Img src="/static/images/accountList.jpg"/>
                <p>多个账号同时登录于管理</p>
            </div>
            <div className="img-wrapper" style={{transform: `translateX(${-currentIndex * imgWidth}px)`}}>
                <Img src="/static/images/popup2.jpg"/>
                <p>增强搜索即搜即得</p>
            </div>
            <div className="img-wrapper" style={{transform: `translateX(${-currentIndex * imgWidth}px)`}}>
                <Img src="/static/images/dragBtn.jpg"/>
                <p>可自定义拖拽按钮</p>
            </div>
            <div className="carousel-btn prev-btn" onClick={handleOnClickPrevBtn}>PREV</div>
            <div className="carousel-btn next-btn" onClick={handleOnClickNectBtn}>NEXT</div>
        </CarouselWrapper>
    );
};

const Product = () => {
    return (
        <React.Fragment>
            <GlobalStyleSheet/>
            <HeaderArea/>
            <SectionWrapper>
                <Carousel/>
                <Description>
                    <h3>「哔哩哔哩助手 2.0」正式版</h3>
                    <p className="description">全新改版，「多账号同时登陆」、「实时同步软件配置」等多种新功能与优化项目</p>
                    <dl>
                        <dt>功能清单</dt>
                        <dd>视频下载</dd>
                        <dd>弹幕下载</dd>
                        <dd>视频字幕下载</dd>
                        <dd>播放页面深色模式</dd>
                        <dd>弹幕发送者查询</dd>
                        <dd>视频播放器自动宽屏</dd>
                        <dd>自动领瓜子</dd>
                        <dd>去污粉-自动过滤直播界面信息</dd>
                        <dd>直播区每日自动签到</dd>
                        <dd>版聊模式-简洁的网页全屏界面</dd>
                        <dd>直播回放视频下载</dd>
                        <dd>网站快捷按钮</dd>
                        <dd>视频动态推送</dd>
                        <dd>直播开播推送</dd>
                        <dd>专栏图片下载</dd>
                        <dd>解除专栏文字不可复制</dd>
                        <dd>自动领取每月大会员福利</dd>
                        <dd>显示失效视频部分信息</dd>
                        <dd>关闭动态页面小视频自动播放</dd>
                        <dd>右键快速搜索</dd>
                        <dd>多账号同时登陆</dd>
                        <dd>实时同步软件配置</dd>
                        <dd>即搜即得搜索栏</dd>
                    </dl>
                    <div className="subscription-buttons">
                        <button>立即订阅 2￥每月</button>
                    </div>
                </Description>
            </SectionWrapper>
            <PriceArea>

            </PriceArea>
            <Footer/>
        </React.Fragment>
    );
};

/**
 * Author: DrowsyFlesh
 * Create: 2020/5/2
 * Description:
 */
export default withRouter(connect((state) => state)(Product));
