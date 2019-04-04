/**
 * Author: DrowsyFlesh
 * Create: 2019/4/3
 * Description:
 */
import {InertiaForce, StaticFriction, Obstruction} from 'Pinball/game/lib/Forces';
import {Vector2} from 'Pinball/game/lib/Math';

import {Thing} from 'Pinball/game/lib/Things/Thing';

export class Baffle extends Thing {
    constructor(game) {
        super({
            game,
            position: new Vector2(0, 0),
            mass: 1,
            density: 10,
            originAcceleration: new Vector2(0, 0),
        });

        this.addForce(new InertiaForce(this)); // 添加惯性力
        this.addForce(new Obstruction(this)); // 添加空气阻力
        this.addForce(new StaticFriction(this, 0.1)); // 添加静摩擦力
    }
}
