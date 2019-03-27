/**
 * Author: DrowsyFlesh
 * Create: 2019/3/27
 * Description:
 */
import {MixClasses} from 'Pinball/game/utils/MixClasses';
import {Movable} from './Movable';
import {Rect} from 'Pinball/game/lib/Shapes/Rect';

export class MovableRect extends MixClasses.mix(Rect, Movable) {
    constructor(options) {
        super(options);
        this.setPosition(options.position); // position属性跨越两个类，需要滞后设置
    }
}
