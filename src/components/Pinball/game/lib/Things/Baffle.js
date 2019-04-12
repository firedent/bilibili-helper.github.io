/**
 * Author: DrowsyFlesh
 * Create: 2019/4/3
 * Description:
 */
import {GravityE, SlowdownE} from 'Pinball/game/lib/Effect';
import {PushForce} from 'Pinball/game/lib/Forces/PushForce';
import {Graphics} from 'pixi.js';
import {CENTER, LEFT, LimitedVector2, RIGHT} from 'Pinball/game/lib/Math';
import {Ball} from 'Pinball/game/lib/Things/Ball';

import {SyncData, Thing} from 'Pinball/game/lib/Things/Thing';

export class Baffle extends Thing {
    type = 'baffle';

    /**
     * 板携带的球对象
     */
    carriedBall;

    /**
     * 板内存储的待发射球
     * @type {Array<Ball>}
     */
    storedBalls = [];

    directionLine;

    _launchPosition;
    launchDelta = new LimitedVector2(0, 0);
    launchTargetPosition = new LimitedVector2(150, 200);
    launchDirection;
    launchStrength;
    launchWidth;

    mousedown = false;

    constructor(game) {
        super({
            game,
            position: new LimitedVector2(100, 550).setMinXY(0, 500).setMaxXY(200, 500),
            width: 100,
            height: 10,
            //radius: 10,
            density: .002,
            originAcceleration: new LimitedVector2(0, 0),
            effects: [
                {
                    type: GravityE,
                    µ: .0007,
                },
            ],
        });

        this.initDirectionLine();
        this.bindMouseEvent();

        this.loadBall();
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

    get level() {
        return this.game.level;
    }

    get player() {
        return this.game.level.player;
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
            if (this.mousedown) {
                this.launchTargetPosition = new LimitedVector2(event.data.global.x, event.data.global.y);
                this.drawDirectionLine();
            }
            return false;
        });
        this.level.bindMouseEvent(this.level.stage, 'mousedown', (event) => {
            event.stopPropagation();
            this.mousedown = true;
            if (this.storedBalls.length > 0 || this.carriedBall) {
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
    }

    // 加载球
    loadBall() {
        if (this.carriedBall) return this; // 如果板上有球，则不加载
        this.launchDelta.length = 0;
        if (this.storedBalls.length > 0) { // 判断是否有已经被加载但未发射的球
            const lastBall = this.storedBalls.shift();
            lastBall.position = this.launchPosition.clone().sub(new LimitedVector2(100 - lastBall.radius[0], lastBall.radius[0] * 2));
            this.carriedBall = lastBall;
            this.drawDirectionLine();
            this.carriedBall.renderable = true;
        } else {
            for (let index in this.player.ballOptions) {
                const ballOption = this.player.ballOptions[index];
                if (!ballOption.loaded) { // 没有加载过的球数据
                    ballOption.loaded = true;
                    const newBall = new Ball({
                        game: this.game,
                        position: this.launchPosition.clone().sub(new LimitedVector2(100 - ballOption.radius, ballOption.radius * 2)),
                        ...ballOption,
                    });
                    this.carriedBall = newBall;
                    this.drawDirectionLine();
                    this.carriedBall.renderable = true;
                    this.level.addThing(newBall); // 第一次加载Thing到level
                    break;
                }
            }
        }
        return this;
    }

    /**
     * 将球推出去
     * @param direction 方向
     * @param strength 大小
     */
    pushBall() {
        let pushBall = this.carriedBall;
        if (pushBall) {
            this.carriedBall = undefined;
            pushBall.carried = false;
            const pushForceVector = new LimitedVector2(1, 1);
            pushForceVector.length = this.launchStrength / 100;
            pushForceVector.radian = this.launchDirection;
            pushBall.addForce(new PushForce(pushBall, pushForceVector));
            this.loadBall();
        }
        return this;
    }

    carryBall(ball) {
        if (!ball.carried) { // 球没有设定为需要被板携带时，将其携带在板上
            if (this.carriedBall) {
                /**
                 * 如果板上已经有球了，将原先的球存在store里
                 * 并用刚接收的球覆盖
                 */
                this.carriedBall.renderable = false;
                this.storedBalls.unshift(this.carriedBall);
            }
            this.carriedBall = ball;
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
            alpha: .2,
            width: .0000001,
            height: .3,
            density: 0,
            position: new LimitedVector2(0, 0),
            zIndex: 1,
            pivot: {x: 0, y: 0.5},
        });
        this.directionLine = line;
        this.level.addThing(this.directionLine);
        return this;
    }

    drawDirectionLine() {
        if (this.carriedBall && this.launchTargetPosition) {
            this.directionLine.renderable = true;
            const line = this.launchTargetPosition.clone().sub(this.launchPosition);
            if (this.launchDirection !== line.radian || this.launchStrength !== line.length || this.launchWidth !== this.carriedBall.radius[0] * 2) {
                this.launchDirection = line.radian;
                this.launchStrength = line.length;
                this.launchWidth = this.carriedBall.radius[0] * 2;
                this.directionLine.position = new LimitedVector2(this.launchPosition.x, this.launchPosition.y - this.carriedBall.radius[0]);
                this.directionLine.width = line.length - this.carriedBall.radius[0];
                this.directionLine.height = this.launchWidth;
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

        this.syncManager.add(new SyncData('acceleration', 'length', 'set', 0, 10));
        this.syncManager.add(new SyncData('velocity', 'length', 'set', 0, 10));
        if (collisionRes[0] === LEFT) {
            this.syncManager.add(new SyncData('position', 'x', 'set', 0, 10));
        } else if (collisionRes[0] === RIGHT) {
            this.syncManager.add(new SyncData('position', 'x', 'set', scene.width - this.width, 10));
        }
        return this;
    }
}
