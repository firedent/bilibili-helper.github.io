/**
 * Author: DrowsyFlesh
 * Create: 2019/4/3
 * Description: 运动阻力
 */
import {Force} from 'Pinball/game/lib/Forces/Force';

export class Obstruction extends Force {
    instantaneous = false;

    constructor(thing) {
        super(thing);
    }

    /**
     * @return {LimitedVector2}
     */
    get f() {
        const newForce = this.thing.velocity.clone();
        newForce.length = newForce.length * newForce.length / 10;
        newForce.multiplyScalar(this.thing.volume);
        return newForce;
    }

    condition() {
        return this.thing.velocity.length > 0;
    }
}
