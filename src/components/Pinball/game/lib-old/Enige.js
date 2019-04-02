import {StaticFriction} from 'Pinball/game/lib-old/Forces/StaticFriction';

/**
 * Author: DrowsyFlesh
 * Create: 2019/4/1
 * Description:
 */
import {LimitedVector2} from 'Pinball/game/lib-old/Math';

export class Enige {
    output = new LimitedVector2(0, 0); // 输出加速度

    velocity;

    constructor(item) {
        this.forces = [];
        this.energy = 0;
    }

    init() {
        this.addForce(new StaticFriction())
    }

    addForce() {

    }

    getForce() {

    }

    calcOutput() { // 计算输出

    }
}
