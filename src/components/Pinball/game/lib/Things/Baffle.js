/**
 * Author: DrowsyFlesh
 * Create: 2019/4/3
 * Description:
 */
import {InertiaForce, StaticFriction, Obstruction} from 'Pinball/game/lib/Forces';
import {LimitedVector2} from 'Pinball/game/lib/Math';
import {RoundedRect} from 'Pinball/game/lib/Shapes';
import {Ball} from 'Pinball/game/lib/Things/Ball';

import {Thing} from 'Pinball/game/lib/Things/Thing';

export class Baffle extends Thing {
    balls = []; // 球的列表
    width = 100;
    height = 10;
    radius = 10;

    constructor(game) {
        super({
            game,
            position: new LimitedVector2(100, 500).setMinXY(0, 500).setMaxXY(200, 500),
            mass: 1,
            density: 0.1,
            originAcceleration: new LimitedVector2(0, 0),
        });
        this.shape = new RoundedRect({
            width: 100,
            height: 10,
            //radius: 10,
        });
        this.item.addChild(this.shape.item);

        //this.addForce(new InertiaForce(this)); // 添加惯性力
        //this.addForce(new Obstruction(this)); // 添加空气阻力
        this.addForce(new StaticFriction(this, .3)); // 添加静摩擦力
    }

    /**
     * 小球发射的位置，一般为板的中轴线上边沿
     */
    get launchPosition() {
        return new LimitedVector2(this.width / 2, 0).add(this.position);
    }

    moveLeft(delta) {
        this.pull(new LimitedVector2(-.5, 0));
    }

    moveRight(delta) {
        this.pull(new LimitedVector2(.5, 0));
    }

    createBall() {
        const newBall = new Ball({
            game: this.game,
            position: this.launchPosition,
            mass: 1,
            density: 1,
            originAcceleration: new LimitedVector2(0, 0),
        });
        this.item.addChild(newBall.item);
        this.balls.push(newBall);
    }

    /**
     * 与场景进行碰撞检测
     * @param scene {Thing}
     */
    collisionWithScene(scene) {
        const collisionRes = super.collisionWithScene(scene);
        window.collisionRes = collisionRes;
        if (collisionRes) {
            const {top, right, bottom, left} = this.nextBBox();
            const {width, height} = scene;
            this.collisionResult.set('acceleration', {name: 'length', operation: 'set', value: 0});
            this.collisionResult.set('velocity', {name: 'length', operation: 'set', value: 0});
            if (left < 0) {
                this.collisionResult.set('position', {name: 'x', operation: 'set', value: 0});
            } else if (right > width) {
                this.collisionResult.set('position', {name: 'x', operation: 'set', value: width - this.width});
            }
            if (top < 0) {
                this.collisionResult.set('position', {name: 'y', operation: 'set', value: 0});
            } else if (bottom > height) {
                this.collisionResult.set('position', {name: 'y', operation: 'set', value: height - this.height});
            }
        }
        return this;
    }
}
