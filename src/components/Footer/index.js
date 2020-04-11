/**
 * Author: DrowsyFlesh
 * Create: 2020/4/11
 * Description:
 */
import React from 'react';
import styled from 'styled-components';
import Page from 'Components/Page';

const FooterWrapper = styled(Page)`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--content-color);
  a {
    color: var(--content-color);
    text-decoration: none;
  }
`;

export default () => {
    return (
        <FooterWrapper>沪ICP备20008971号 © 2020 bilibili helper. <span className="email">邮箱：<a href="mailto:shanghaishujiao@gmail.com">shanghaishujiao@gmail.com</a></span></FooterWrapper>
    );
}
