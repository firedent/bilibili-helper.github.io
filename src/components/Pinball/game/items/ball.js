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
        this.position = position || {x: 0, y: 0};
        this.acceleration = acceleration || {x: Math.random() * speed, y: Math.random() * speed};
    }

    init() {
        let item = new Graphics();
        item.beginFill(this.color);
        item.drawCircle(0, 0, this.radius);
        item.endFill();
        item.x = this.position.x;
        item.y = this.position.y;
        item.radius = this.radius;
        item.speed = this.speed;
        item.acceleration = this.acceleration;
        this.item = item;
        return this;
    }

    move(delta) {
        this.item.x += this.item.acceleration.x * delta;
        this.item.y += this.item.acceleration.y * delta;
    }

    collisionCheckWithBox(width, height) {
        if (this.item.x - this.radius < 0) {
            this.item.x = this.radius;
            this.item.acceleration.x = -this.item.acceleration.x;
        } else if (this.item.x + this.radius > width) {
            this.item.x = width - this.radius;
            this.item.acceleration.x = -this.item.acceleration.x;
        }
        if (this.item.y - this.radius < 0) {
            this.item.y = this.radius;
            this.item.acceleration.y = -this.item.acceleration.y;
        } else if (this.item.y + this.radius > height) {
            this.item.y = height - this.radius;
            this.item.acceleration.y = -this.item.acceleration.y;
        }
    }
};
