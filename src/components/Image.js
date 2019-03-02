/**
 * Author: DrowsyFlesh
 * Create: 2019/2/28
 * Description:
 */
import {connect} from 'dva';
import React from 'react';

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
        const {image, sign, dispatch, ...rest} = this.props;
        return <img key={sign} src={image[sign] || null} {...rest}/>;
    }
}

export default connect(({image}) => ({image}))(Image);
