/**
 * Author: DrowsyFlesh
 * Create: 2019/4/1
 * Description: 静摩擦力
 */
import {Force} from 'Pinball/game/lib/Forces';
import {EPSILON, G} from 'Pinball/game/lib/Math'; // 重力
import {LimitedVector2} from 'Pinball/game/lib';

export class StaticFriction extends Force {
    _CONST_µG;

    instantaneous = false;

    /**
     * 静摩擦力
     * @param mass 质量
     * @param µ 摩擦系数，暂不区分静摩擦力和动摩擦力
     * @param a 加速度
     */
    constructor(thing, µ) {
        super(thing);
        this.mass = thing.mass;
        this.µ = µ;
        this._CONST_µG = this.µ * G * thing.crossSection;
    }

    get constNumber() {
        return this.mass * this._CONST_µG;
    }

    /**
     * @return {LimitedVector2}
     */
    get f() {
        const newForce = this.thing.velocity.clone().negate(); // 获取运动方向相反的反向
        if (newForce.length > this.constNumber) newForce.length = this.constNumber;
        return newForce;
    }

    condition() {
        return true;
    }
}
