/**
 * Author: DrowsyFlesh
 * Create: 2019/3/3
 * Description:
 */
import React from 'react';
import {connect} from 'dva';
import styled, {createGlobalStyle} from 'styled-components';
import withRouter from 'umi/withRouter';
import CommentList from '../../components/CommentList/CommentList';

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
  }
`;

const Header = styled.div`
  position: relative;
  flex-shrink: 0;
  min-width: 800px;
  background-color: var(--bilibili-pink);
  color: var(--background-color);
  padding: 50px 0px;
  overflow: hidden;
  & > * {
    display: block;
    max-width: 800px;
    margin: 0px auto;
    padding: 0px 10px;
  }
`;

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {comments, routing} = this.props;
        const {oid, pn: page} = comments.config;
        if (!routing.location.query) router.replace({pathname: '/', query: {oid, page}});
    }

    render() {
        return (
            <React.Fragment>
                <GlobalStyleSheet/>
                <Header>
                    <h1>BILIBILI HELPER</h1>
                </Header>
                <CommentList/>
            </React.Fragment>
        );
    }

};


export default withRouter(connect((state) => state)(Home));
