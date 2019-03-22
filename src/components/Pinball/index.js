/**
 * Author: DrowsyFlesh
 * Create: 2019/3/21
 * Description:
 */
import React from 'react';
import styled from 'styled-components';
import {app} from './game';

const PinballView = styled.div`
  position: fixed;
  top: calc(50% - 425px);
  left: calc(50% - 425px);
  width: 850px;
  height: 850px;
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

export class PinballArea extends React.Component {
    componentDidMount() {
        const currentCanvas = document.body.querySelector('canvas');
        if (currentCanvas) document.body.removeChild(currentCanvas);
        this.view.appendChild(app.view);
    }

    render() {
        return (
            <PinballView ref={i => this.view = i}>

            </PinballView>
        );
    }
}
