/**
 * Author: DrowsyFlesh
 * Create: 2019/4/3
 * Description:
 */
import {PushForce} from 'Pinball/game/lib/Forces/PushForce';
import {Graphics} from 'pixi.js';
import {CENTER, LEFT, LimitedVector2, RIGHT} from 'Pinball/game/lib/Math';
import {Ball} from 'Pinball/game/lib/Things/Ball';

import {Thing} from 'Pinball/game/lib/Things/Thing';

export class Baffle extends Thing {
    type = 'baffle';

    carriedBalls = []; // 球的列表

    directionLine;

    _launchPosition;
    launchDelta = new LimitedVector2(0, 0);
    launchTargetPosition = new LimitedVector2(150, 200);
    //launchDirection = Math.PI * 3 / 2;
    //launchStrength = 1;

    mousedown = false;

    pushOut = false; // 球是否已经被击出

    constructor(game) {
        super({
            game,
            position: new LimitedVector2(100, 550).setMinXY(0, 500).setMaxXY(200, 500),
            width: 100,
            height: 10,
            //radius: 10,
            density: .002,
            originAcceleration: new LimitedVector2(0, 0),
            µ: .0007,
        });

        this.initDirectionLine();
        this.bindMouseEvent();

        this.createBall();
    }

    /**
     * 小球发射的位置，一般为板的中轴线上边沿
     */
    get launchCenterPosition() {
        return new LimitedVector2(this.width / 2, 0).add(this.position);
    }

    get launchPosition() {
        if (this._launchPosition === undefined) {
            this._launchPosition = this.launchCenterPosition;
        }
        return this.launchCenterPosition.sub(this.launchDelta);
    }

    ///**
    // * @param delta {LimitedVector2}
    // */
    //set launchPosition(delta) {
    //    this._launchPosition = this.launchCenterPosition.add(delta);
    //}

    get level() {
        return this.game.level;
    }

    moveLeft(delta) {
        this.pull(new LimitedVector2(-.5, 0));
    }

    moveRight(delta) {
        this.pull(new LimitedVector2(.5, 0));
    }

    bindMouseEvent() {
        this.game.level.bindMouseEvent(this.level.stage, 'mousemove', (event) => {
            event.stopPropagation();
            if (this.mousedown && !this.pushOut) {
                this.launchTargetPosition = new LimitedVector2(event.data.global.x, event.data.global.y);
                this.drawDirectionLine();
            }
            return false;
        });
        this.level.bindMouseEvent(this.level.stage, 'mousedown', (event) => {
            event.stopPropagation();
            this.mousedown = true;
            if (!this.pushOut) {
                this.launchTargetPosition = new LimitedVector2(event.data.global.x, event.data.global.y);
                this.drawDirectionLine();
            }
        });
        this.level.bindMouseEvent(this.level.stage, 'mouseup', (event) => {
            this.mousedown = false;
        });

        const space = this.game.bindKeyboard(document, 'space', 32);
        space.downHandle = (e) => {
            this.pushBall();
        };
        //this.game.level.bindMouseEvent(this.item, 'mousedown', (event) => {
        //    event.stopPropagation();
        //    //console.log(event);
        //    this.createBall();
        //});
    }

    /**
     * 创建球
     * @param radius
     */
    createBall(radius = 10) {
        const ballPosition = this.launchPosition.clone().sub(new LimitedVector2(100 - radius, radius * 2));
        const newBall = new Ball({
            game: this.game,
            position: ballPosition,
            density: .001,
            radius: radius,
            originAcceleration: new LimitedVector2(0, 0),
            µ: .0002,
        });
        this.carriedBalls.push(newBall);
        this.level.addThing(newBall);
    }

    /**
     * 将球推出去
     * @param direction 方向
     * @param strength 大小
     */
    pushBall() {
        if (this.pushOut) return;
        this.pushOut = true;
        if (this.carriedBalls.length === 0) return this;
        let pushBall = this.carriedBalls.shift();
        if (pushBall) {
            pushBall.carried = false;
            const pushForceVector = new LimitedVector2(1, 1);
            pushForceVector.length = this.launchStrength;
            pushForceVector.radian = this.launchDirection;
            pushBall.addForce(new PushForce(pushBall, pushForceVector));
        }
        return this;
    }

    carryBall(ball) {
        this.pushOut = false;
        if (!ball.carried) {
            this.carriedBalls.unshift(ball);
            ball.carried = true;
            ball.next.acceleration.length = 0;
            ball.next.velocity.length = 0;
            this.launchDelta = this.launchCenterPosition.clone().sub(new LimitedVector2(ball.position.x + ball.radius[0], this.position.y));
        }
        return this;
    }

    initDirectionLine() {
        const line = new Thing({
            game: this.game,
            type: 'other',
            color: 0x000000,
            alpha: .5,
            width: .0000001,
            height: .3,
            density: 1,
            position: new LimitedVector2(0, 0),
            zIndex: 1,
            pivot: {x: 0, y: 0.5},
        });
        this.directionLine = line;
        this.level.addThing(this.directionLine);
        return this;
    }

    drawDirectionLine() {
        if (this.carriedBalls.length > 0 && this.launchTargetPosition) {
            this.directionLine.renderable = true;
            const line = this.launchTargetPosition.clone().sub(this.launchPosition);
            if (this.launchDirection !== line.radian || this.launchStrength !== line.length / 100) {
                const ball = this.carriedBalls[0];
                this.launchDirection = line.radian;
                this.launchStrength = line.length / 100;
                this.directionLine.position = new LimitedVector2(this.launchPosition.x, this.launchPosition.y - ball.radius[0]);
                this.directionLine.width = line.length - ball.radius[0];
                this.directionLine.height = ball.radius[0] * 2;
                this.directionLine.rotation = line.radian;
            }
        } else this.directionLine.renderable = false;
        return this;
    }

    /**
     * 与场景进行碰撞检测和碰撞反应处理，不反弹
     * @param scene {Thing}
     */
    collisionWithScene(scene) {
        const collisionRes = scene.inBBox(this.nextBBox());
        if (collisionRes[0] === CENTER && collisionRes[1] === CENTER) return false; // 未与场景边缘碰撞

        this.syncManager.add({prototype: 'acceleration', subAttrName: 'length', operation: 'set', value: 0, priority: 10});
        this.syncManager.add({prototype: 'velocity', subAttrName: 'length', operation: 'set', value: 0, priority: 10});
        if (collisionRes[0] === LEFT) {
            this.syncManager.add({prototype: 'position', subAttrName: 'x', operation: 'set', value: 0, priority: 10});
        } else if (collisionRes[0] === RIGHT) {
            this.syncManager.add({prototype: 'position', subAttrName: 'x', operation: 'set', value: scene.width - this.width, priority: 10});
        }
        return this;
    }
}
