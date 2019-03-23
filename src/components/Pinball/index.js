/**
 * Author: DrowsyFlesh
 * Create: 2019/3/21
 * Description:
 */
import React from 'react';
import styled, {keyframes} from 'styled-components';
import {createApp} from './game';

const panelWidth = 700;
const panelHeight = 700;
const canvasWidth = 300;
const canvasHeight = 300;

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
  top: calc(50% - ${panelHeight / 2}px);
  left: calc(50% - ${panelWidth / 2}px);
  width: ${panelWidth}px;
  height:  ${panelHeight}px;
  padding: 30px;
  box-sizing: border-box;
  border: 2px solid var(--bilibili-pink);
  border-radius: 20px;
  background-color: var(--background-color);
  z-index: 1000;
  canvas {
    position: absolute;
    top: calc(50% - ${canvasHeight / 2}px);
    right: calc(50% - ${canvasWidth / 2}px);
    width: ${canvasWidth}px;
    height: ${canvasHeight}px;
    border-radius: 10px;
    background-color: var(--bilibili-pink);
    cursor: pointer!important;
  }
`;

const Mask = styled.div`
  display: block;
  position: absolute;
  top: calc(50% - ${canvasHeight / 2}px);
  right: calc(50% - ${canvasWidth / 2}px);
  width: ${canvasWidth}px;
  height: ${canvasHeight}px;
  z-index: 1;
  background-color: var(--pure-white);
  opacity: 0.5;
`;
const Title = styled.header`
  margin: 20px 0;
  font-size: 30px;
  font-family: monospace;
  text-align: center;
  color: var(--bilibili-pink);
`;

const Description = styled.p`
  font-size: 16px;
  text-align: center;
  color: var(--content-color);
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
  user-select: none;
  &:hover {
    opacity: 0.7;
  }
`;

const StatusBtn = styled.button`
  display: block;
  position: absolute;
  top: calc(50% - 35px);
  left: calc(50% - 75px);
  width: 150px;
  height: 70px;
  padding: 10px;
  font-size: 20px;
  border: 2px solid var(--pure-white);
  border-radius: 7px;
  background-color: var(--bilibili-pink);
  color: var(--pure-white);
  z-index: 10;
  cursor: pointer;
  outline: none;
  user-select: none;
`;

export class PinballArea extends React.Component {
    constructor(props) {
        super(props);
        this.app = null;
        this.state = {
            show: false,
            play: false,
            pause: false,
        };
    }

    //componentDidMount() {
    //    this.handleOnClickPinball();
    //    this.setState({play: true, pause: false});
    //    this.app.start();
    //}

    handleOnClickPinball = () => {
        const that = this;
        import('./game').then(({createApp}) => {
            if (!this.app) this.app = createApp(canvasWidth, canvasHeight);
            if (this.app) this.view.appendChild(this.app.view);
            this.app.view.addEventListener('click', function(e) {
                e.preventDefault();
                that.handlePause(e);
            });
            this.app.stop();
            document.body.style.overflow = 'hidden';

            this.setState({show: !this.state.show});
        });

    };

    handleOnClickCloseBtn = () => {
        this.setState({show: false});
        this.app.stop();
        document.body.style.overflow = '';
    };

    handleOnScroll = (e) => {
        e.preventDefault();
        return false;
    };

    handleStart = (e) => {
        e.preventDefault();
        this.setState({play: true, pause: false});
        this.app.start();
    };

    handlePause = (e) => {
        e.preventDefault();
        this.setState({play: false, pause: true});
        this.app.stop();
    };

    render() {
        const {play, pause} = this.state;
        return (
            <React.Fragment>
                <PinballBtn className="pinball" onClick={this.handleOnClickPinball}/>
                <PinballView ref={i => this.view = i} show={this.state.show} onScroll={this.handleOnScroll}>
                    <Title>RPG Pinball</Title>
                    <Description>
                        一款可以打怪升级的RPG打砖块游戏~
                        开发中~
                    </Description>
                    <CloseBtn onClick={this.handleOnClickCloseBtn}>Close</CloseBtn>
                    {!play && !pause && <StatusBtn onClick={this.handleStart}>Start</StatusBtn>}
                    {!play && pause && <StatusBtn onClick={this.handleStart}>Play</StatusBtn>}
                    {!play && <Mask/>}
                </PinballView>
            </React.Fragment>
        );
    }
}
