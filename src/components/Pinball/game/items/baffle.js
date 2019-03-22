import {Vector2} from 'Components/Pinball/game/lib';

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
        this.position = position || new Vector2(0, 0);
        this.acceleration = acceleration || new Vector2(0.001, 0.001);
        this.maxAcceleration = new Vector2(length * 0.07, thick * 0.1);
        this.recoveryAcceleration = new Vector2(0.001, 0.001);
    }

    init() {
        let item = new Graphics();
        item.beginFill(this.color);
        item.drawRect(0, 0, this.length, this.thick);
        item.endFill();
        item.x = this.position.x;
        item.y = this.position.y;
        this.item = item;
        return this;
    }

    setX(n) {
        this.item.x = n;
        return this;
    }

    moveLeft() {
        if (Object.is(this.acceleration.x, NaN)) this.acceleration.x = this.maxAcceleration.x;
        if (this.acceleration.x < this.maxAcceleration.x) this.acceleration.x += (this.acceleration.x + 0.5) * this.speed;
        return this.setX(this.item.x - this.acceleration.x);
    }

    moveRight() {
        if (Object.is(this.acceleration.x, NaN)) this.acceleration.x = this.maxAcceleration.x;
        if (this.acceleration.x < this.maxAcceleration.x) this.acceleration.x += (this.acceleration.x + 0.5) * this.speed;
        return this.setX(this.item.x + this.acceleration.x);
    }

    stopMove() {
        this.acceleration.set(0, 0);
        return this;
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
        return this;
    }

    collisionCheckWithBall(ball) {
        let topS = this.topS(ball);
        if (topS > ball.radius) return;
        let bottomS = this.bottomS(ball);
        if (bottomS > ball.radius) return;
        let leftS = this.leftS(ball);
        if (leftS > ball.radius) return;
        let rightS = this.rightS(ball);
        if (rightS > ball.radius) return;

        // 弹板角落回弹处理
        const distanceToTopLeft = new Vector2(this.item.x, this.item.y).distanceTo(ball.position);
        if (distanceToTopLeft - ball.radius < 1) {
            if (ball.acceleration.y > 0) ball.acceleration.negateY();
            if (ball.acceleration.x > 0) ball.acceleration.negateX();
            return this;
        }
        const distanceToTopRight = new Vector2(this.item.x + this.length, this.item.y).distanceTo(ball.position);
        if (distanceToTopRight - ball.radius < 1) {
            if (ball.acceleration.y > 0) ball.acceleration.negateY();
            if (ball.acceleration.x < 0) ball.acceleration.negateX();
            return this;
        }
        const distanceToBottomLeft = new Vector2(this.item.x, this.item.y + this.thick).distanceTo(ball.position);
        if (distanceToBottomLeft - ball.radius < 1) {
            if (ball.acceleration.y < 0) ball.acceleration.negateY();
            if (ball.acceleration.x > 0) ball.acceleration.negateX();
            return this;
        }
        const distanceToBottomRight = new Vector2(this.item.x + this.length, this.item.y + this.thick).distanceTo(ball.position);
        if (distanceToBottomRight - ball.radius < 1) {
            if (ball.acceleration.y < 0) ball.acceleration.negateY();
            if (ball.acceleration.x < 0) ball.acceleration.negateX();
            return this;
        }
        // 弹板四面回弹处理
        if ((topS > 0 && topS <= ball.radius && ball.item.x > this.item.x && ball.item.x < this.item.x + this.length)
            || (bottomS > 0 && bottomS <= ball.radius && ball.item.x > this.item.x && ball.item.x < this.item.x + this.length)) {
            ball.acceleration.negateY();
        }
        if ((leftS > 0 && leftS <= ball.radius && ball.item.y > this.item.y && ball.item.y < this.item.y + this.thick)
            || (rightS > 0 && rightS <= ball.radius && ball.item.y > this.item.y && ball.item.y < this.item.y + this.thick)) {
            ball.acceleration.negateX();
        }
        return this;
    }

    topS = (ball) => this.item.y - ball.item.y;
    bottomS = (ball) => ball.item.y - this.item.y - this.thick;
    leftS = (ball) => this.item.x - ball.item.x;
    rightS = (ball) => ball.item.x - this.item.x - this.length;
};
