/**
 * Author: DrowsyFlesh
 * Create: 2019/4/1
 * Description: 惯性力
 */
import {Force} from 'Pinball/game/lib/Forces';

export class InertiaForce extends Force{
    /**
     * 惯性力
     * @param mass 质量
     * @param a {Vector2} 加速度
     */
    constructor(thing) {
        super(thing);
        this.mass = thing.mass;
        this.a = thing.acceleration;
    }

    get f() {
        return this.a.clone().multiplyScalar(this.mass);
    }

    condition() {
        return this.a.length > 0;
    }
}
