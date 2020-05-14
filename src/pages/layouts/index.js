/**
 * Author: DrowsyFlesh
 * Create: 2019/3/3
 * Description:
 */
import React from 'react';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import {
    CommentArea,
    HeaderArea,
    DownloadArea,
    AnnouncementArea,
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


const Home = () => (
    <React.Fragment>
        <GlobalStyleSheet/>
        <HeaderArea/>
        {/*<PriceArea/>*/}
        <QuestionnaireArea/>
        <DownloadArea/>
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
