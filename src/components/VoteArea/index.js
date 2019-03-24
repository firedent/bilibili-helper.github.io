/**
 * Author: DrowsyFlesh
 * Create: 2019/3/4
 * Description:
 */
import React from 'react';
import {connect} from 'dva';
import styled from 'styled-components';
import Page from 'Components/Page';

const VoteAreaWrapper = styled(Page)`
  h3 {
    margin: 15px 0 20px;
    font-size: 16px;
    color: #212121;
    p {
      margin: 3px 0px;
      font-size: 12px;
      color: var(--content-color);
      font-weight: normal;
    }
  }
  .votes-list {
    margin-left: 10px;
    border-radius: 3px;
    overflow: hidden;
  }
  .mask {
    margin-left: 10px;
    color: var(--content-color);
  }
`;

const VoteLine = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  font-size: 14px;
  margin-bottom: 2px;
  padding: 7px 10px;
  width: calc(100% - 72px);
  border-radius: 3px;
  border-right: 1px solid var(--bilibili-pink);
  border-left: 1px solid var(--bilibili-pink);
  background-color: #f1f1f1;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${({likesum, like}) => (likesum ? like / likesum * 100 : 0)}%;
    border-radius: 0 3px 3px 0;
    background-color: var(--bilibili-pink);
    transition: width 0.3s;
  }
  &:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
  }
  &:hover {
    opacity: 0.8;
  }
  .topic {
    color: #000;
    z-index: 1;
  }
  .percent {
    position: absolute;
    top: 8px;
    right: -46px;
    font-size: 12px;
    color: var(--content-color);
  }
  .like-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    z-index: 1;
    button {
      margin-right: 20px;
      padding: 1px 10px;
      border: none;
      border-radius: 3px;
      font-size: 12px;
      background-color: var(--pure-white);
      color: var(--content-color);
      outline: none;
      cursor: pointer;
      &:last-of-type {
        margin-right: 0;
      }
      &[disabled] {
        cursor: not-allowed;
        opacity: 0.8;
      }
      &.like:hover, &.like[on='1'] {
        color: var(--bilibili-blue);
      }
      &.hate:hover, &.hate[on='1'] {
        color: var(--bilibili-pink);
      }
    }
  }
`;

class VoteArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voting: false,
        };
    }

    handleOnClickLike = (action, rpid) => {
        const {oid} = this.props.comments.voteConfig;
        this.setState({voting: true});
        this.props.dispatch({type: 'comments/setLike', payload: {action, rpid, oid}});
        setTimeout(() => this.props.dispatch({type: 'comments/fetchVotes'}), 500);
        setTimeout(() => this.setState({voting: false}), 2000);
    };

    handleOnClickHate = (action, rpid) => {
        const {oid} = this.props.comments.voteConfig;
        this.setState({voting: true});
        this.props.dispatch({type: 'comments/setHate', payload: {action, rpid, oid}});
        setTimeout(() => this.props.dispatch({type: 'comments/fetchVotes'}), 500);
        setTimeout(() => this.setState({voting: false}), 2000);
    };

    renderVote = (likeSum, {rpid, content, action, like}) => (
        <VoteLine key={rpid} className="vote-block" likesum={likeSum} like={like}>
            <span className="topic">{content.message}</span>
            <div className="like-box">
                <button
                    disabled={this.state.voting}
                    className="like" on={action === 1 ? '1' : '0'}
                    onClick={() => this.handleOnClickLike(Number(action !== 1), rpid)}
                >LIKE
                </button>
                <button
                    disabled={this.state.voting}
                    className="hate" on={action === 2 ? '1' : '0'}
                    onClick={() => this.handleOnClickHate(Number(action !== 2), rpid)}
                >HATE
                </button>
            </div>
            <div className="percent">{Number(likeSum ? like / likeSum * 100 : 0).toFixed(1)}%</div>
        </VoteLine>
    );

    getVotes = () => {
        let res = [];
        const {votes, replyMap} = this.props.comments;
        if (votes.rpidArray && votes.rpidArray.length > 0) {
            res = _.sortBy(votes.rpidArray.map((rpid) => replyMap[rpid].self), ({like}) => -like);
        }
        return res;
    };

    render() {
        const {global, comments} = this.props;
        const sortedVotes = this.getVotes();
        const sum = _.reduce(comments.votes.likeSum, (sum, like) => sum + like);
        return (
            <VoteAreaWrapper>
                <h3>
                    新功能投票 ~ FEATURE REQUESTS
                    <p>为希望添加进助手的功能点赞吧~</p>
                </h3>
                <div className="votes-list">
                    {sortedVotes.map((voteData) => this.renderVote(sum, voteData))}
                </div>
                {!global.status.connected && <div className="mask">~ 尚未连接助手 ~</div>}
            </VoteAreaWrapper>
        );
    }
}

export default connect(({comments, global}) => ({comments, global}))(VoteArea);
