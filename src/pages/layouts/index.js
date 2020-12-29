/**
 * Author: DrowsyFlesh
 * Create: 2019/3/3
 * Description:
 */
import React from 'react';
import styled from 'styled-components';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import {
    CommentArea,
    HeaderArea,
    DownloadArea,
    AnnouncementArea,
    RecommendArea,
    BadgeArea,
    FeedbackArea,
    VoteArea,
    WebsiteUpdateArea,
    Page,
    FeedArea,
    QuestionnaireArea,
    PinballArea,
    Footer,
    PriceArea,
    GlobalStyleSheet,
} from 'Components';

const TempMessage = styled.div`
  text-align: center;
  margin: 0 auto 20px;
  padding: 4px 0;
  max-width: 760px;
  border-radius: 4px;
  font-size: 14px;
  background-color: red;
  color: yellow;
  a {
    color: yellow;
  }
  
`;
const Home = () => (
    <React.Fragment>
        <GlobalStyleSheet/>
        <HeaderArea/>
        {/*<PriceArea/>*/}
        <TempMessage>
            从1.2.28版本开始助手将使用新的网站域名：<a href="https://bilibilihelper.com/" target="_blank">https://bilibilihelper.com/</a>，旧版本将无法连接网站，无法评论和投票
        </TempMessage>
        <QuestionnaireArea/>
        <DownloadArea/>
        <RecommendArea/>
        <AnnouncementArea/>
        <WebsiteUpdateArea/>
        <VoteArea/>
        <FeedbackArea/>
        <FeedArea/>
        <BadgeArea/>
        <CommentArea/>
        <Footer/>
    </React.Fragment>
);

export default withRouter(connect(state => state)(Home));
