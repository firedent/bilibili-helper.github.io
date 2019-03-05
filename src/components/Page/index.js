/**
 * Author: DrowsyFlesh
 * Create: 2019/3/5
 * Description:
 */

import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`

`;

class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <PageWrapper>{this.props.children}</PageWrapper>
        );
    }
}

export default Page;
