/**
 * Author: DrowsyFlesh
 * Create: 2019/3/5
 * Description:
 */

import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
    width: 800px;
    margin: 10px auto;
    padding: 0px 10px;
`;

class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <PageWrapper {...this.props}>{this.props.children}</PageWrapper>
        );
    }
}

export default Page;
