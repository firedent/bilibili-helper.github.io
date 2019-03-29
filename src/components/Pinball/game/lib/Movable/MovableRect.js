import {LimitedVector2} from 'Pinball/game/lib';

/**
 * Author: DrowsyFlesh
 * Create: 2019/3/27
 * Description:
 */
import {Movable} from './Movable';
import {Rect} from 'Pinball/game/lib/Shapes/Rect';

export class MovableRect extends Rect {
    constructor(options) {
        super(options);
        this.movable = new Movable({item: this.item, ...options});
    }

    get center() {
        return new LimitedVector2(this.movable.position.x + this.width / 2, this.movable.position.y + this.height / 2);
    }
}
