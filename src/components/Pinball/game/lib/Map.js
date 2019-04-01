
/**
 * Author: DrowsyFlesh
 * Create: 2019/3/26
 * Description:
 */
import {MovableRoundedRect} from 'Pinball/game/lib/Movable';
import {Blocks} from 'Pinball/game/lib/Blocks';

export class Map extends MovableRoundedRect{
    apps;
    width;
    height;
    blocks;

    constructor(options) {
        super(options);
        this.initBlocks(options. blocks);
    }

    initBlocks(options) {
        this.blocks = new Blocks({app: this.app, ...options});
        this.app.app.stage.addChild(this.blocks.item);
        return this.blocks;
    }
}
