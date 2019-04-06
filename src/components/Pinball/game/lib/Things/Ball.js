import {InertiaForce, Obstruction, StaticFriction} from 'Pinball/game/lib/Forces';
import {RoundedRect} from 'Pinball/game/lib/Shapes';
import {LimitedVector2} from 'Pinball/game/lib';

/**
 * Author: DrowsyFlesh
 * Create: 2019/4/4
 * Description:
 */
import {Thing} from 'Pinball/game/lib/Things/Thing';

export class Ball extends Thing {
    type = 'ball';
    radius; // 球半径

    carried = true; // 被baffle携带的标记，被携带即跟随baffle一起移动

    constructor({game, position, mass, density, originAcceleration, radius}) {
        super({game, position, mass, density, originAcceleration});
        this.radius = radius;
        this.shape = new RoundedRect({
            width: radius * 2,
            height: radius * 2,
            radius: radius,
        });
        this.item.addChild(this.shape.item);

        //this.addForce(new InertiaForce(this)); // 添加惯性力
        //this.addForce(new Obstruction(this)); // 添加空气阻力
        //this.addForce(new StaticFriction(this, .0)); // 添加静摩擦力
    }

    followBaffle(baffle) {
        this.position = baffle.launchPosition.clone().sub(new LimitedVector2(this.radius, this.radius * 2));
    }

    /**
     * 与场景进行碰撞检测
     * @param scene {Thing}
     */
    collisionWithScene(scene) {
        const collisionRes = super.collisionWithScene(scene);
        if (collisionRes) {
            if (collisionRes[0] === 'left' || collisionRes[0] === 'right') {
                this.collisionResult.add({
                    prototype: 'velocity',
                    operation: 'set',
                    value: this.velocity.clone().negateX(),
                });
            }
            if (collisionRes[1] === 'top' || collisionRes[1] === 'bottom') {
                this.collisionResult.add({
                    prototype: 'velocity',
                    operation: 'set',
                    value: this.velocity.clone().negateY(),
                });
            }
        }
        return this;
    }
}
