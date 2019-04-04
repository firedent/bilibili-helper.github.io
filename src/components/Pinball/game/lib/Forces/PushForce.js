/**
 * Author: DrowsyFlesh
 * Create: 2019/4/4
 * Description:
 */
import {Force} from 'Pinball/game/lib/Forces/Force';

export class PushForce extends Force {
    /**
     * 推力，是两个物体间的互相作用力
     * @param thing 施加推力的物体
     * @param targetThing 受到推力的物体
     * @param vector 施加的力
     */
    constructor(thing, targetThing, vector) {
        super(thing);
        this.targetThing = targetThing;
        this.vector = vector;
    }

    /**
     * @return {LimitedVector2}
     */
    get f() {
        this.targetThing.addForce(this.vector);
        return this.vector;
    }
}
