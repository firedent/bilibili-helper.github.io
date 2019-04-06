/**
 * Author: DrowsyFlesh
 * Create: 2019/4/1
 * Description: 惯性力
 */
import {Force} from 'Pinball/game/lib/Forces';

export class InertiaForce extends Force {
    instantaneous = false;

    /**
     * 惯性力
     * @param mass 质量
     * @param a {LimitedVector2} 加速度
     */
    constructor(thing) {
        super(thing);
        this.mass = thing.mass;
    }

    /**
     * @return {LimitedVector2}
     */
    get f() {
        return this.thing.acceleration.clone().multiplyScalar(this.mass);
    }

    condition() {
        return this.thing.acceleration.length > 0;
    }
}
