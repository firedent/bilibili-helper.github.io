import {Baffle, Ball} from 'Components/Pinball/game/items';
import {Vector2} from 'Components/Pinball/game/lib/Vector2';

/**
 * Author: DrowsyFlesh
 * Create: 2019/3/23
 * Description:
 */
import {Application, Container, Graphics} from 'pixi.js';

export class Game {
    constructor() {
        this.app = null;
        this.ballsContainer = new Container();
        this.ballsMap = [];
        this.baffle = null;
        this.collisionNormalLine = null;
        this.collisionInputLine = null;
        this.collisionOutputLine = null;
        this.collisionLine = null;
    }

    create(width, height) {
        const app = new Application({
            width,
            height,
            antialias: true,
            transparent: true,
        });
        this.app = app;
        this.createCollisionNormalLine(width, height);
        this.createCollisionInputLine(width, height);
        this.createCollisionOutputLine(width, height);
        this.createCollisionLine(width, height);
        return this;
    }

    createCollisionNormalLine(width, height) {
        let collisionNormalLine = new Graphics();
        collisionNormalLine.beginFill(0xff0000);
        collisionNormalLine.drawRect(0, 0, width, 1);
        collisionNormalLine.endFill();
        collisionNormalLine.x = width / 2;
        collisionNormalLine.y = height / 2;
        this.collisionNormalLine = collisionNormalLine;
        this.app.stage.addChild(collisionNormalLine);
        return this;
    }

    createCollisionInputLine(width, height) {
        let collisionInputLine = new Graphics();
        collisionInputLine.beginFill(0x00ff00);
        collisionInputLine.drawRect(0, 0, width, 1);
        collisionInputLine.endFill();
        collisionInputLine.x = width / 2;
        collisionInputLine.y = height / 2;
        this.collisionInputLine = collisionInputLine;
        this.app.stage.addChild(collisionInputLine);
        return this;
    }

    createCollisionOutputLine(width, height) {
        let collisionOutputLine = new Graphics();
        collisionOutputLine.beginFill(0x0000ff);
        collisionOutputLine.drawRect(0, 0, width, 1);
        collisionOutputLine.endFill();
        collisionOutputLine.x = width / 2;
        collisionOutputLine.y = height / 2;
        this.collisionOutputLine = collisionOutputLine;
        this.app.stage.addChild(collisionOutputLine);
        return this;
    }

    createCollisionLine(width, height) {
        let collisionLine = new Graphics();
        collisionLine.beginFill(0xdddddd);
        collisionLine.drawRect(0, 0, width, 1);
        collisionLine.endFill();
        collisionLine.x = width / 2;
        collisionLine.y = height / 2;
        this.collisionLine = collisionLine;
        this.app.stage.addChild(collisionLine);
        return this;
    }

    addTicker(tickFunc) {
        this.app.ticker.add(tickFunc);
    }

    createBall({color = 0xffffff, radius = 10, speed = 1, position = new Vector2(0, 0), acceleration = new Vector2(0, 0), ...rest}) {
        let ball = new Ball({color, speed, radius, position, acceleration: acceleration.multiplyScalar(speed), ...rest}).init(this);
        this.ballsMap.push(ball);
        this.ballsContainer.addChild(ball.item);
        this.app.stage.addChild(this.ballsContainer);
        return ball;
    }

    createBaffle({color = 0xffffff, length = 100, thick = 7, speed = 0.4, position = new Vector2(0, 0), radius = 0, ...rest}) {
        let baffle = new Baffle({color, length, thick, speed, position, radius, ...rest}).init(this);
        this.baffle = baffle;
        this.app.stage.addChild(baffle.item);
        return baffle;
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
