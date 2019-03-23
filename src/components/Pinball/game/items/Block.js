/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import {Rect} from 'Pinball/game/items';
import {Vector2} from 'Pinball/game/lib';

export class Block {
    constructor({app, color = 0xffffff, width, height, radius = 0, hp = 1, position = new Vector2(0, 0), ...rest}) {
        this.color = color;
        this.hp = hp;
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.position = position;
        this.app = app;
        Object.assign(this, rest);
        if (app) this.init(app);
    }

    init(app) {
        this.app = app;

        this.rect = new Rect(this);
        this.item = this.rect.item;
        this.setPosition(this.position);
        return this;
    }

    setPosition(x, y) {
        if (x !== undefined && y !== undefined) {
            this.item.x = x;
            this.item.y = y;
        } else if (x instanceof Vector2) {
            this.item.x = x.x;
            this.item.y = x.y;
        }
        return this;
    }

}
