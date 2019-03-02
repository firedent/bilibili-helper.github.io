/**
 * Author: DrowsyFlesh
 * Create: 2019/3/1
 * Description:
 */
import React from 'react';
import {connect} from 'dva';
import styled from 'styled-components';
import Image from '../Image';


const EmojiWrapper = styled.span.attrs({className: 'emoji'})`
  & img {
    width: 30px;
    margin: 0 3px;
  }
`;

class Emoji extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.emoji.emojiURLs[props.sign],
        };
    }

    render() {
        const {sign} = this.props;
        return (
            <EmojiWrapper><Image url={this.state.url} sign={sign}/></EmojiWrapper>
        );
    }
}

export default connect(({emoji}) => ({emoji}))(Emoji);
