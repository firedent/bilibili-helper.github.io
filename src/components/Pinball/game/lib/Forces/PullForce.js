/**
 * Author: DrowsyFlesh
 * Create: 2019/4/4
 * Description:
 */
import {Force} from 'Pinball/game/lib/Forces/Force';

export class PullForce extends Force {
    /**
     * 拉力
     * @param thing {Thing}
     * @param vector {Vector2} 拉力的方向
     * @param instantaneous {boolean} 是否为瞬时力
     */
    constructor(thing, vector, instantaneous = true) {
        super(thing);
        this.vector = vector;
    }

    /**
     * @return {LimitedVector2}
     */
    get f() {
        return this.vector;
    }

    /**
     * @return {LimitedVector2}
     */
    get reactionForce() {
        return this.vector.clone().negate();
    }

    condition() { // 拉力生效的条件
        return true;
    }
}
