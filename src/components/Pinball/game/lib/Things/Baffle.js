/**
 * Author: DrowsyFlesh
 * Create: 2019/4/3
 * Description:
 */
import {PushForce} from 'Pinball/game/lib/Forces/PushForce';
import {Graphics} from 'pixi.js';
import {InertiaForce, StaticFriction, Obstruction} from 'Pinball/game/lib/Forces';
import {LimitedVector2} from 'Pinball/game/lib/Math';
import {RoundedRect} from 'Pinball/game/lib/Shapes';
import {Ball} from 'Pinball/game/lib/Things/Ball';

import {Thing} from 'Pinball/game/lib/Things/Thing';

export class Baffle extends Thing {
    type = 'baffle';

    balls = []; // 球的列表
    width = 100;
    height = 10;
    radius = 10;

    directionLine;

    launchTargetPosition;
    launchDirection = Math.PI * 3 / 2;
    launchStrength = 1;

    mousedown = false;

    pushOut = false; // 球是否已经被击出

    constructor(game) {
        super({
            game,
            position: new LimitedVector2(100, 500).setMinXY(0, 500).setMaxXY(200, 500),
            mass: 1,
            density: 1,
            originAcceleration: new LimitedVector2(0, 0),
        });
        this.shape = new RoundedRect({
            width: 100,
            height: 10,
            radius: 10,
        });
        this.item.addChild(this.shape.item);

        //this.addForce(new InertiaForce(this)); // 添加惯性力
        //this.addForce(new Obstruction(this)); // 添加空气阻力
        this.addForce(new StaticFriction(this, .2)); // 添加静摩擦力

        this.initDirectionLine();
        this.bindMouseEvent();

        this.setPushDirection(new LimitedVector2(this.launchPosition.x, this.launchPosition.y - 300).sub(this.launchPosition));

        this.createBall();
    }

    /**
     * 小球发射的位置，一般为板的中轴线上边沿
     */
    get launchPosition() {
        return new LimitedVector2(this.width / 2, 0).add(this.position);
    }

    get level() {
        return this.game.level;
    }

    moveLeft(delta) {
        //this.carryBall();
        this.pull(new LimitedVector2(-.5, 0));
    }

    moveRight(delta) {
        //this.carryBall();
        this.pull(new LimitedVector2(.5, 0));
    }

    bindMouseEvent() {
        this.game.level.bindMouseEvent(this.level.stage, 'mousemove', (event) => {
            event.stopPropagation();
            const {data} = event;
            if (this.mousedown) {
                this.launchTargetPosition = new LimitedVector2(data.global.x, data.global.y);
                this.setPushDirection(new LimitedVector2(data.global.x, data.global.y).sub(this.launchPosition));
            }
            return false;
        });
        this.level.bindMouseEvent(this.level.stage, 'mousedown', (event) => {
            event.stopPropagation();
            this.mousedown = true;
            const {data} = event;
            this.launchTargetPosition = new LimitedVector2(data.global.x, data.global.y);
            this.setPushDirection(new LimitedVector2(data.global.x, data.global.y).sub(this.launchPosition));
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
     * 设定球发射目标点
     */
    setPushDirection(point) {
        this.launchDirection = point.radian;
        this.launchStrength = point.length / 100;
        this.drawDirectionLine(point.length, point.radian);
    }

    /**
     * 创建球
     * @param radius
     */
    createBall(radius = 5) {
        const newBall = new Ball({
            game: this.game,
            position: this.launchPosition.clone().sub(new LimitedVector2(100 - radius, radius * 2)),
            mass: 1,
            density: 1,
            radius: radius,
            originAcceleration: new LimitedVector2(0, 0),
        });
        this.level.addThing(newBall);
    }

    //carryBall() {
    //    if (!this.pushOut) {
    //        this.balls.forEach((ball) => {
    //            ball.position = this.launchPosition.clone().add(new LimitedVector2(0, -ball.radius));
    //        });
    //    }
    //}

    /**
     * 将球推出去
     * @param direction 方向
     * @param strength 大小
     */
    pushBall() {
        if (this.pushOut) return;
        this.pushOut = true;
        this.directionLine.renderable = false;
        this.level.things.ball.forEach((ball) => {
            if (ball.carried) {
                ball.carried = false;
                const pushForce = new LimitedVector2(1,1);
                pushForce.length = this.launchStrength;
                pushForce.radian = this.launchDirection;
                ball.addForce(new PushForce(ball, pushForce));
            }
        });
    }

    initDirectionLine() {
        const line = new Graphics();
        line.beginFill(0x000000, 0.5);
        line.drawRect(0, 0, .0000001, 1);
        line.endFill();
        line.pivot.x = 0;
        line.pivot.y = 0;
        this.directionLine = line;
        this.level.scene.item.addChild(this.directionLine);
    }

    drawDirectionLine(long, radian) {
        this.directionLine.x = this.launchPosition.x;
        this.directionLine.y = this.launchPosition.y;
        this.directionLine.width = long;
        this.directionLine.rotation = radian;
    }

    /**
     * 与场景进行碰撞检测
     * @param scene {Thing}
     */
    collisionWithScene(scene) {
        const collisionRes = super.collisionWithScene(scene);
        //window.collisionRes = collisionRes;
        if (collisionRes) {
            const {width} = scene.shape;
            this.collisionResult.add({prototype: 'acceleration', subAttrName: 'length', operation: 'set', value: 0, priority: 10});
            this.collisionResult.add({prototype: 'velocity', subAttrName: 'length', operation: 'set', value: 0, priority: 10});
            if (collisionRes[0] === 'left') {
                this.collisionResult.add({prototype: 'position', subAttrName: 'x', operation: 'set', value: 0, priority: 10});
            } else if (collisionRes[0] === 'right') {
                this.collisionResult.add({prototype: 'position', subAttrName: 'x', operation: 'set', value: width - this.width, priority: 10});
            }
        }
        return this;
    }
}
