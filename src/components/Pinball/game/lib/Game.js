/**
 * Author: DrowsyFlesh
 * Create: 2019/3/23
 * Description:
 */
import {Baffle, Ball, BlockMap} from 'Components/Pinball/game/items';
import {Vector2} from 'Components/Pinball/game/lib/Vector2';
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
    }

    create(width, height) {
        this.width = width;
        this.height = height;
        const app = new Application({
            width,
            height,
            antialias: true,
            transparent: true,
        });
        this.app = app;
        return this;
    }

    addTicker(tickFunc) {
        this.app.ticker.add(tickFunc);
        return this;
    }

    createBall({color = 0xffffff, radius = 10, speed = 1, position = new Vector2(0, 0), acceleration = new Vector2(0, 0), ...rest}) {
        let ball = new Ball({color, speed, radius, position, acceleration: acceleration.multiplyScalar(speed), ...rest}).init(this);
        this.ballsMap.push(ball);
        this.ballsContainer.addChild(ball.item);
        this.app.stage.addChild(this.ballsContainer);
        return ball;
    }

    createBaffle({color, length, thick, speed, position, radius, ...rest}) {
        this.baffle = new Baffle({color, length, thick, speed, position, radius, ...rest}).init(this);
        this.app.stage.addChild(this.baffle.item);
        return this.baffle;
    }

    createMap(options) {
        this.blockMap = new BlockMap(options).init(this);
        this.app.stage.addChild(this.blockMap.item);
        return this.blockMap;
    }

    bindKey(element, keyCode) {
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
        return state;
    };
}
