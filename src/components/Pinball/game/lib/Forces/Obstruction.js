/**
 * Author: DrowsyFlesh
 * Create: 2019/4/3
 * Description: 运动阻力
 */
import {Force} from 'Pinball/game/lib/Forces/Force';

export class Obstruction extends Force {
    constructor(thing) {
        super(thing);
    }

    get f() {
        const newForce = this.velocity.clone();
        newForce.length = newForce.length * newForce.length;
        newForce.multiplyScalar(this.thing.volume);
        return newForce;
    }

    condition() {
        return this.velocity.length > 0;
    }
}
