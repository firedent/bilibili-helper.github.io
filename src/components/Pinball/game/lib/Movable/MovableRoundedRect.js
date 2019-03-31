import {LimitedVector2} from 'Pinball/game/lib';

/**
 * Author: DrowsyFlesh
 * Create: 2019/3/27
 * Description:
 */
import {Movable} from './Movable';
import {RoundedRect} from 'Pinball/game/lib/Shapes';

export class MovableRoundedRect extends RoundedRect {
    constructor(options) {
        super(options);
        this.movable = new Movable({item: this.item, ...options});
    }

    get center() {
        return new LimitedVector2(this.movable.position.x + this.halfWidth, this.movable.position.y + this.halfHeight);
    }
}
