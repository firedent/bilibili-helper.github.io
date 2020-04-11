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
  
  .email {
    margin-left: auto;
  }
`;

export default () => {
    return (
        <FooterWrapper><a target="_blank" href="http://www.beian.miit.gov.cn/">沪ICP备20008971号</a>&nbsp;&nbsp;&nbsp;&nbsp;© 2020 bilibili helper. <span className="email">邮箱：<a target="_blank" href="mailto:shanghaishujiao@gmail.com">shanghaishujiao@gmail.com</a></span></FooterWrapper>
    );
}
