import {RoundedRect} from 'Pinball/game/lib/Shapes';

/**
 * Author: DrowsyFlesh
 * Create: 2019/4/4
 * Description:
 */
import {Thing} from 'Pinball/game/lib/Things/Thing';

export class Ball extends Thing {
    constructor({game, position, mass, density, originAcceleration}) {
        super({game, position, mass, density, originAcceleration});
        this.shape = new RoundedRect({
            width: 10,
            height: 10,
            radius: 5,
        });
        this.item.addChild(this.shape.item);
    }
}
