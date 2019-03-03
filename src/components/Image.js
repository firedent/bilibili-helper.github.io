/**
 * Author: DrowsyFlesh
 * Create: 2019/2/28
 * Description:
 */
import {connect} from 'dva';
import React from 'react';
//import styled from 'styled-components';
//
//const Img = styled.img`
//  &:not([src]) {
//    content: url("data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
//    border: 1px solid var(--border-color);
//    box-sizing: border-box;
//  }
//`;

class Image extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {sign, url} = this.props;
        url && this.props.dispatch({type: 'image/fetch', payload: {url, sign}});
    }

    componentDidUpdate() {
        const {sign, url} = this.props;
        url && this.props.dispatch({type: 'image/fetch', payload: {url, sign}});
    }

    render() {
        const {image, sign, url, dispatch, className, ...rest} = this.props;
        return <img className={['model-img', className].join(' ')} key={sign} src={image[sign] || null} {...rest}/>;
    }
}

export default connect(({image}) => ({image}))(Image);
