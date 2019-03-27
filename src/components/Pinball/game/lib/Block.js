/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import {MovableRect} from './index';

export class Block extends MovableRect {
    friction; // 摩擦力

    constructor({friction = 0, ...options}) {
        super(options);
        this.friction = friction;
    }
}
