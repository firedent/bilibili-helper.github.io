/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import {Rect} from 'Pinball/game/classes';
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

        this.rect = new Rect(this);
        this.item = this.rect.item;
        this.setPosition(this.position);
    }

    setPositionX(x) {
        this.position.setX(x);
        this.item.x = x;
    }

    setPositionY(y) {
        this.position.setY(y);
        this.item.y = y;
    }

    setPosition(x, y) {
        if (typeof x === 'number' && typeof y === 'number') {
            this.setPositionX(x);
            this.setPositionY(y);
        } else if (x instanceof Vector2) {
            this.setPositionX(x.x);
            this.setPositionY(x.y);
        }
        return this;
    }
}
