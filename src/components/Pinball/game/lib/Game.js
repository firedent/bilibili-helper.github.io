/**
 * Author: DrowsyFlesh
 * Create: 2019/3/23
 * Description:
 */
import {Baffle, Ball, BlockMap} from 'Components/Pinball/game/lib';
import * as dat from 'dat.gui';
import {Application, Container} from 'pixi.js';

export class Game {
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

        this.keyMap = {};
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
        this.blockMap = new BlockMap(options).init(this);
        this.app.stage.addChild(this.blockMap.item);
        return this.blockMap;
    }

    initGUI(options) {
        if (!this.gui) this.gui = new dat.GUI();
        this.guiController = options;
        for (let folderName in options) {
            const folder = this.gui.addFolder(folderName);
            for (let controllerName in options[folderName]) {
                const {value, min,max,step} = options[folderName][controllerName];
                folder.add({[controllerName]: value}, controllerName, min,max,step);
            }
            folder.open();
        }
    }

    bindKey(element, keyName, keyCode) {
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
