import {Vector2} from 'Components/Pinball/game/lib';

/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import {Graphics} from 'pixi.js';

export class Block {
    constructor({color, hp, position, width, height}) {
        this.color = color;
        this.hp = hp;
        this.width = width;
        this.height = height;
        this.position = position || new Vector2(0, 0);
    }

    init() {
        const item = new Graphics();
        item.beginFill(this.color);
        item.drawRoundedRect(this.position.x, this.position.y, this.width, this.height, 3);
        item.endFill();
        item.x = this.position.x;
        item.y = this.position.y;
        this.item = item;
        return this;
    }

}
