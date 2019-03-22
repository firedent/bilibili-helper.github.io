/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import {Graphics} from 'pixi.js';

export class Baffle {
    constructor({color, length, thick, speed = 1, position, acceleration}) {
        this.color = color;
        this.length = length;
        this.thick = thick;
        this.speed = speed;
        this.position = position || {x: 0, y: 0};
        this.acceleration = acceleration || {x: 0.001, y: 0.001};
        this.maxAcceleration = {x: length * 0.1, y: thick * 0.1};
        this.recoveryAcceleration = {x: 0.001, y: 0.001};
    }

    init() {
        let item = new Graphics();
        item.beginFill(this.color);
        item.drawRect(0, 0, this.length, this.thick);
        item.endFill();
        item.x = this.position.x;
        item.y = this.position.y;
        item.length = this.length;
        item.thick = this.thick;
        item.speed = this.speed;
        item.acceleration = this.acceleration;
        this.item = item;
        return this;
    }

    moveUp(max) {
        if (Object.is(this.item.acceleration.y, NaN)) this.item.acceleration.y = this.maxAcceleration.y;
        if (this.item.acceleration.y < this.maxAcceleration.y) this.item.acceleration.y += Math.pow(this.item.acceleration.y, 0.9) * 10;
        this.item.y -= this.item.acceleration.y;
    }

    moveDown(min) {
        if (Object.is(this.item.acceleration.y, NaN)) this.item.acceleration.y = this.maxAcceleration.y;
        if (this.item.acceleration.y < this.maxAcceleration.y) this.item.acceleration.y += Math.pow(this.item.acceleration.y, 0.9) * 10;
        this.item.y += this.item.acceleration.y;
    }

    moveLeft() {
        if (Object.is(this.item.acceleration.x, NaN)) this.item.acceleration.x = this.maxAcceleration.x;
        if (this.item.acceleration.x < this.maxAcceleration.x) this.item.acceleration.x += (this.item.acceleration.x + 0.5) * this.item.speed;
        this.item.x -= this.item.acceleration.x;
    }

    moveRight() {
        if (Object.is(this.item.acceleration.x, NaN)) this.item.acceleration.x = this.maxAcceleration.x;
        if (this.item.acceleration.x < this.maxAcceleration.x) this.item.acceleration.x += (this.item.acceleration.x + 0.5) * this.item.speed;
        this.item.x += this.item.acceleration.x;
    }

    moveToCenter(center) {
        if (this.item.y === center) return;
        if (this.recoveryAcceleration.y < this.maxAcceleration.y * 10) {
            this.recoveryAcceleration.y += Math.sqrt(this.recoveryAcceleration.y);
        }
        if (this.item.y - center > 0) {
            this.item.y -= this.recoveryAcceleration.y;
        } else if (this.item.y - center < 0) {
            this.item.y += this.recoveryAcceleration.y;
        }
        if (Math.abs(this.item.y - center) < 10) {
            this.item.y = center;
            this.recoveryAcceleration.y = 0.001;
        }
    }

    stopMove() {
        if (this.item.acceleration.x > 0.001) this.item.acceleration.x -= this.item.acceleration.x;
        else this.item.acceleration.x = 0.001;
        if (this.item.acceleration.y > 0.001) this.item.acceleration.y -= this.item.acceleration.y;
        else this.item.acceleration.y = 0.001;
    }

    collisionCheckWithBox(width, height) {
        if (this.item.x < 0) {
            this.item.x = 0;
        } else if (this.item.x + this.length > width) {
            this.item.x = width - this.length;
        }
        if (this.item.y < 0) {
            this.item.y = 0;
        } else if (this.item.y + this.thick > height) {
            this.item.y = height - this.thick;
        }
    }

    collisionCheckWithBall(ball) {
        if (ball.item.y < this.item.y) return;
        if (ball.item.y > this.item.y + this.item.thick) return;
        if (ball.item.x < this.item.x) return;
        if (ball.item.x > this.item.x + this.item.length) return;

        const topS = Math.abs(this.item.y - ball.item.y);
        const bottomS = Math.abs(ball.item.y - this.item.y - this.item.thick);
        const leftS = Math.abs(this.item.x - ball.item.x);
        const rightS = Math.abs(ball.item.x - this.item.x - this.item.length);
        if ((topS < ball.item.radius && ball.item.x > this.item.x && ball.item.x < this.item.x + this.item.length)
            || (bottomS < ball.item.radius && ball.item.x > this.item.x && ball.item.x < this.item.x + this.item.length)) {
            ball.acceleration.y = -ball.acceleration.y;
        }
        if ((leftS < ball.item.radius && ball.item.y > this.item.y && ball.item.y < this.item.y + this.item.thick)
            || (rightS < ball.item.radius && ball.item.y > this.item.y && ball.item.y < this.item.y + this.item.thick)) {
            ball.acceleration.x = -ball.acceleration.x;
        }

        if (topS < 0 && bottomS < 0 && leftS < 0 && rightS < 0) {
            if (topS < bottomS) ball.item.y -= this.item.thick;
            else ball.item.y += this.item.thick;
            if (leftS < rightS) ball.item.x -= this.item.thick;
            else ball.item.x += this.item.thick;
        }
    }
};
