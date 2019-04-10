/**
 * Author: DrowsyFlesh
 * Create: 2019-04-10
 * Description:
 */
import {Effect} from 'Pinball/game/lib/Effect/Effect';
import {StaticFriction} from 'Pinball/game/lib/Forces';

export class GravityE extends Effect {
    constructor(thing) {
        super({holder: thing, lasting: true});
    }

    apply() {
        this.holder.addForce(new StaticFriction(this.holder, this.holder.µ));
    }
}
