/**
 * Author: DrowsyFlesh
 * Create: 2019/2/28
 * Description:
 */
import {connect} from 'dva';
import React from 'react';
import styled, {keyframes} from 'styled-components';
import LazyLoad from 'react-lazyload';

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Img = styled.img`
  &:not([src]) {
    content: url("data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
    border: 1px solid var(--border-color);
    box-sizing: border-box;
    opacity: 0;
  }
  &[src] {
    animation: ${FadeIn} cubic-bezier(0.16, 0.6, 0.45, 0.93);
    animation-duration: 1s;
  }
`;

class Image extends React.Component {
    constructor(props) {
        super(props);
        const {sign, url} = props;
        url && this.props.dispatch({type: 'image/fetch', payload: {url, sign}});
    }

    render() {
        const {image, sign, url, dispatch, className, ...rest} = this.props;
        return (
            <LazyLoad once>
                <Img className={['model-img', className].join(' ')} key={sign} src={image[sign] || null} {...rest}/>
            </LazyLoad>
        );
    }
}

export default connect(({image}) => ({image}))(Image);
