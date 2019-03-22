/**
 * Author: DrowsyFlesh
 * Create: 2019/3/21
 * Description:
 */
import React from 'react';
import styled, {keyframes} from 'styled-components';
import {createApp} from './game';

const PinballDownAnimate = keyframes`
  0% {
    top: 0px;
  }
  100% {
    top: 10px;
  }
`;
const PinballBtn = styled.span`
  position: relative;
  display: inline-block;
  width: 20px;
  height: 16px;
  margin-left: 10px;
  border-bottom: 1px solid var(--pure-white);
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: calc(50% - 2.5px);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: var(--pure-white);
    animation: 0.25s ${PinballDownAnimate} cubic-bezier(0.5,-0.2, 1, 1) infinite alternate;
  }
`;
const PinballView = styled.div`
  display: ${({show}) => show ? 'block' : 'none'};
  position: fixed;
  top: calc(50% - 425px);
  left: calc(50% - 425px);
  width: 850px;
  height: 850px;
  padding: 30px;
  box-sizing: border-box;
  border: 2px solid var(--bilibili-pink);
  border-radius: 20px;
  background-color: var(--background-color);
  z-index: 1000;
  canvas {
    position: absolute;
    top: calc(50% - 150px);
    right: calc(50% - 150px);
    width: 300px;
    height: 300px;
    border-radius: 10px;
    background-color: var(--bilibili-pink);
  }
`;
const Title = styled.header`
  margin: 20px 0;
  font-size: 30px;
  font-family: monospace;
  text-align: center;
  color: var(--bilibili-pink);
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 25px;
  right: 30px;
  border: none;
  background-color: transparent;
  font-size: 20px;
  font-family: monospace;
  color: var(--bilibili-pink);
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 0.7;
  }
`;

export class PinballArea extends React.Component {
    constructor(props) {
        super(props);
        this.app = null;
        this.state = {
            show: false,
        };
    }

    handleOnClickPinball = () => {
        if (!this.app) this.app = createApp(300, 300);
        if (this.app) this.view.appendChild(this.app.view);

        this.setState({show: !this.state.show});
    };

    handleOnClickCloseBtn = () => {
        this.setState({show: false});
    };

    render() {
        return (
            <React.Fragment>
                <PinballBtn className="pinball" onClick={this.handleOnClickPinball}/>
                <PinballView ref={i => this.view = i} show={this.state.show}>
                    <Title>RPG Pinball</Title>
                    <CloseBtn onClick={this.handleOnClickCloseBtn}>Close</CloseBtn>
                </PinballView>
            </React.Fragment>
        );
    }
}
