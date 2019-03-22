import {Vector2} from 'Components/Pinball/game/lib';

/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import {Graphics} from 'pixi.js';

export class Ball {
    constructor({color, radius, speed, position, acceleration}) {
        this.color = color;
        this.radius = radius;
        this.speed = speed;
        this.position = position || new Vector2(0, 0);
        this.acceleration = acceleration || new Vector2(Math.random() * speed, Math.random() * speed);
    }

    init() {
        let item = new Graphics();
        item.beginFill(this.color);
        item.drawCircle(0, 0, this.radius);
        item.endFill();
        item.x = this.position.x;
        item.y = this.position.y;
        this.item = item;
        return this;
    }

    move(delta) {
        const currentPositionVector = new Vector2(this.item.x, this.item.y);
        const deltaVector = this.acceleration.clone().multiplyScalar(delta).add(currentPositionVector);
        return this.setPosition(deltaVector.x, deltaVector.y);
    }

    setPosition(x, y) {
        this.position.set(x, y);
        this.item.x = x;
        this.item.y = y;
        return this;
    }

    collisionCheckWithBox(width, height) {
        if (this.item.x - this.radius < 0) {
            this.item.x = this.radius;
            this.acceleration.negateX();
        } else if (this.item.x + this.radius > width) {
            this.item.x = width - this.radius;
            this.acceleration.negateX();
        }
        if (this.item.y - this.radius < 0) {
            this.item.y = this.radius;
            this.acceleration.negateY();
        } else if (this.item.y + this.radius > height) {
            this.item.y = height - this.radius;
            this.acceleration.negateY();
        }
        return this;
    }
};
