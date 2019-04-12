/**
 * Author: DrowsyFlesh
 * Create: 2019/3/3
 * Description:
 */
import React from 'react';
import {connect} from 'dva';
import styled, {createGlobalStyle} from 'styled-components';
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
    PinballArea,
} from 'Components';

const GlobalStyleSheet = createGlobalStyle`
  html {
    --background-color: #fafafa;
	  --bilibili-blue: #23ade5;
	  --bilibili-pink: #fb7299;
	  --border-color: #f1f1f1;
	  --content-color: #555;
	  --pure-white: #fcfcfc;
  }
  body {
    background: var(--background-color);
  }
  *, body {
    margin: 0;
    padding: 0;
    font-family: system-ui, "PingFang SC", STHeiti, sans-serif;
  }
  .model-img {
    &:not([src]) {
      content: url("data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
      border: 1px solid var(--border-color);
      box-sizing: border-box;
    }
  }
  .dg.ac {
    z-index: 1001!important;
  }
`;
const Home = () => (
    <React.Fragment>
        <GlobalStyleSheet/>
        <HeaderArea/>
        {/*<DownloadArea/>*/}
        {/*<AnnouncementArea/>*/}
        {/*<WebsiteUpdateArea/>*/}
        {/*<VoteArea/>*/}
        {/*<FeedbackArea/>*/}
        {/*<FeedArea/>*/}
        {/*<BadgeArea/>*/}
        {/*<CommentArea/>*/}
    </React.Fragment>
);

export default withRouter(connect((state) => state)(Home));
