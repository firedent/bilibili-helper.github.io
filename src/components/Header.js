/**
 * Author: DrowsyFlesh
 * Create: 2019/3/9
 * Description:
 */
import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.h3`
  align-items: center;
  margin: 15px 0 20px;
  font-size: 16px;
  color: #212121;
  a {
    margin-left: 20px;
    padding: 2px 7px;
    line-height: 22px;
    vertical-align: bottom;
    font-size: 12px;
    font-weight: normal;
    border: 1px solid;
    border-radius: 3px;
    text-decoration: none;
    background-color: var(--pure-white);
    color: var(--bilibili-blue);
    cursor: pointer;
    outline: none;
    user-select: none;
    &:active {
      background-color: var(--bilibili-blue);
      color: var(--pure-white);
    }
  }
  p {
    margin: 3px 0px;
    font-size: 12px;
    color: var(--content-color);
    font-weight: normal;
  }
`;
export const Header = function(props) { return <HeaderWrapper>{props.children}</HeaderWrapper>;};
