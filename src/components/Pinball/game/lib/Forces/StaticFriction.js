/**
 * Author: DrowsyFlesh
 * Create: 2019/4/1
 * Description:
 */
import {Force} from 'Pinball/game/lib/Forces';

export class StaticFriction extends Force {
    /**
     * 静摩擦力
     * @param mass 质量
     * @param µ 静摩擦系数
     * @param a 加速度
     */
    constructor(thing, µ) {
        super(thing);
        this.mass = thing.mass;
        this.µ = µ;
    }

    get f() {
        const newForce = this.thing.acceleration.clone().negate(); // 获取运动方向相反的反向
        newForce.length = this.mass * this.µ;
        return newForce;
    }

    condition() {
        return this.thing.acceleration.length === 0;
    }
}
