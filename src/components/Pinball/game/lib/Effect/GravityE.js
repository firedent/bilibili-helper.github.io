/**
 * Author: DrowsyFlesh
 * Create: 2019-04-10
 * Description:
 */
import {Effect} from 'Pinball/game/lib/Effect/Effect';
import {StaticFriction} from 'Pinball/game/lib/Forces';

export class GravityE extends Effect {
    type = 'gravity';

    /**
     * 摩擦系数，包含静摩擦和滑动摩擦
     */
    µ;

    constructor({holder, µ}) {
        super({holder});
        this.µ = µ;
    }

    apply(callback) {
        super.apply(() => {
            this.isEnded = true;

            this.holder.addForce(new StaticFriction(this.holder, this.µ));
        });
    }
}
