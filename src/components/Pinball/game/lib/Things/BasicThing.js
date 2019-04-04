/**
 * Author: DrowsyFlesh
 * Create: 2019/4/3
 * Description:
 */
import {Thing} from 'Pinball/game/lib/Things/Thing';

export class BasicThing extends Thing {
    constructor({game, position, mass, density, originAcceleration}) {
        super({game, position, mass, density, originAcceleration});
    }
}
