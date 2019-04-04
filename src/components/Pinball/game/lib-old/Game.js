/**
 * Author: DrowsyFlesh
 * Create: 2019/3/23
 * Description:
 */
import {Baffle, Ball, Blocks, Map} from 'Components/Pinball/game/lib-old';
import * as dat from 'dat.gui';
import {Application, Container} from 'pixi.js';

export class Game {
    app;
    gui;
    keyMap = {}; // 存储按键绑定的相关数据

    constructor({outputLevel = 'debug'} = {outputLevel: 'debug'}) {
        this.app = null;
        this.width = 0;
        this.height = 0;
        this.outputLevel = outputLevel;

        this.ballsContainer = new Container();
        this.ballsMap = [];
        this.baffle = null;
        this.blockMap = null;

        this.gui = null;
        this.guiController = {};
        this.initGUI();
    }

    create(width, height) {
        this.width = width;
        this.height = height;
        const app = new Application({
            width,
            height,
            antialias: true,
            transparent: true,
            TARGET_FPMS: 0.03,
        });
        this.app = app;
        return this;
    }

    addTicker(tickFunc) {
        this.app.ticker.add(tickFunc);
        return this;
    }

    createBall(options) {
        let ball = new Ball({app: this, ...options});
        this.ballsMap.push(ball);
        this.ballsContainer.addChild(ball.item);
        this.app.stage.addChild(this.ballsContainer);
        return ball;
    }

    createBaffle(options) {
        this.baffle = new Baffle({app: this, ...options});
        this.app.stage.addChild(this.baffle.item);
        return this.baffle;
    }

    createMap(options) {
        this.map = new Map({app: this, ...options});
        return this;
    }

    initGUI(options) {
        if (!this.gui) this.gui = new dat.GUI();
        this.guiController = options;
        for (let folderName in options) {
            const folder = this.gui.addFolder(folderName);
            for (let controllerName in options[folderName]) {
                if (controllerName === 'open' && options[folderName][controllerName]) {
                    folder.open();
                } else {
                    const {value, min, max, step} = options[folderName][controllerName];
                    folder.add(value, controllerName, min, max, step);
                }
            }
        }
    }

    bindKeyboard(element, keyName, keyCode) {
        const state = {
            down: false,
            downHandle: () => {},
            upHandle: () => {},
        };
        const __keyDownHandle = function(e) {
            e.preventDefault();
            if (e.keyCode === keyCode) {
                state.down = true;
                state.downHandle();
            }
        };

        const __keyUpHandle = function(e) {
            e.preventDefault();
            if (e.keyCode === keyCode) {
                state.down = false;
                state.upHandle();
            }
        };
        element.addEventListener('keydown', __keyDownHandle, false);
        element.addEventListener('keyup', __keyUpHandle, false);
        this.keyMap[keyName] = state;
        return state;
    };
}
