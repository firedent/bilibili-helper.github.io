import {Vector2} from 'Components/Pinball/game/lib';

/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import {Graphics} from 'pixi.js';

export class Baffle {
    constructor({
        color = 0xffffff,
        length = 100,
        thick = 10,
        speed = 1,
        position = new Vector2(0, 0),
        acceleration = new Vector2(0.001, 0.001),
        radius = 0,
    }) {
        this._radius = 0;

        this.color = color;
        this.length = length;
        this.thick = thick;
        this.speed = speed;
        this.radius = radius;
        this.position = position;
        this.acceleration = acceleration;
        this.maxAcceleration = new Vector2(length * 0.07, thick * 0.1);

        this.canMove = true;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        const shorter = Math.min(this.thick, this.length);
        this._radius = value < shorter / 2 ? value : shorter / 2;
    }

    get width() {
        return this.length;
    }

    set width(value) {
        this.length = value;
        return this;
    }

    get height() {
        return this.thick;
    }

    set height(value) {
        this.thick = value;
        return this;
    }

    init(app) {
        this.app = app;
        let item = new Graphics();
        item.beginFill(this.color);
        if (this.radius !== 0) item.drawRoundedRect(0, 0, this.length, this.thick, this.radius);
        else item.drawRect(0, 0, this.length, this.thick);
        item.endFill();
        item.x = this.position.x;
        item.y = this.position.y;
        this.item = item;
        return this;
    }

    setX(n) {
        this.item.x = n;
        this.position.setX(n);
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

    //collisionCheckWithBall(ball) {
    //    this.canMove = true;
    //    let topS = this.topS(ball);
    //    if (topS > ball.radius) return;
    //    let bottomS = this.bottomS(ball);
    //    if (bottomS > ball.radius) return;
    //    let leftS = this.leftS(ball);
    //    if (leftS > ball.radius) return;
    //    let rightS = this.rightS(ball);
    //    if (rightS > ball.radius) return;
    //
    //    // 弹板角落回弹处理
    //    const distanceToTopLeft = new Vector2(this.item.x, this.item.y).distanceTo(ball.position);
    //    const angle = ball.acceleration.clone().angle();
    //    if (distanceToTopLeft < ball.radius) { // attack top left
    //        if ((angle > 0 && angle < 45) || (angle > 225 && angle < 360)) {
    //            //ball.acceleration.flip().negate();
    //            const normalVector = this.position.clone().sub(ball.position);
    //            this.setBallAcceleration(ball, normalVector);
    //
    //        } else if (angle >= 45 && angle <= 90) ball.acceleration.negateX(); // 4
    //        else if (angle >= 180 && angle <= 225) ball.acceleration.negateY(); // 5
    //        this.canMove = false;
    //        return this;
    //    }
    //    const distanceToTopRight = new Vector2(this.item.x + this.length, this.item.y).distanceTo(ball.position);
    //    if (distanceToTopRight - ball.radius < 1) {
    //        if (angle > 135 && angle < 315) {
    //            //ball.acceleration.flip();
    //            const normalVector = ball.position.clone().sub(this.position);
    //            this.setBallAcceleration(ball, normalVector);
    //        }
    //        else if ((angle >= 315 && angle <= 360) || angle === 0) ball.acceleration.negateY(); // 4
    //        else if (angle >= 90 && angle <= 135) ball.acceleration.negateX(); // 5
    //        this.canMove = false;
    //        return this;
    //    }
    //    const distanceToBottomLeft = new Vector2(this.item.x, this.item.y + this.thick).distanceTo(ball.position);
    //    if (distanceToBottomLeft - ball.radius < 1) {
    //        if ((angle < 135 && angle >= 0) || angle > 315) {
    //            const normalVector = this.position.clone().sub(ball.position);
    //            this.setBallAcceleration(ball, normalVector);
    //            //ball.acceleration.flip();
    //        }
    //        else if (angle >= 135 && angle <= 180) ball.acceleration.negateY(); // 5
    //        else if (angle >= 270 && angle <= 315) ball.acceleration.negateX(); // 4
    //        this.canMove = false;
    //        return this;
    //    }
    //    const distanceToBottomRight = new Vector2(this.item.x + this.length, this.item.y + this.thick).distanceTo(ball.position);
    //    if (distanceToBottomRight - ball.radius < 1) {
    //        if (angle > 45 && angle < Math.PI * 225) {
    //            const normalVector = ball.position.clone().sub(this.position);
    //            this.setBallAcceleration(ball, normalVector);
    //            //ball.acceleration.flip().negate();
    //        }
    //        else if (angle >= 0 && angle <= 45) ball.acceleration.negateY(); // 4
    //        else if (angle >= 225 && angle < 270) ball.acceleration.negateX(); // 5
    //        this.canMove = false;
    //        return this;
    //    }
    //    // 弹板四面回弹处理
    //    if ((topS > 0 && topS <= ball.radius && ball.item.x > this.item.x && ball.item.x < this.item.x + this.length)
    //        || (bottomS > 0 && bottomS <= ball.radius && ball.item.x > this.item.x && ball.item.x < this.item.x + this.length)) {
    //        ball.acceleration.negateY();
    //    }
    //    if ((leftS > 0 && leftS <= ball.radius && ball.item.y > this.item.y && ball.item.y < this.item.y + this.thick)
    //        || (rightS > 0 && rightS <= ball.radius && ball.item.y > this.item.y && ball.item.y < this.item.y + this.thick)) {
    //        ball.acceleration.negateX();
    //    }
    //    return this;
    //}

    //setBallAcceleration(ball, normal) {
    //    const projectionVector = ball.acceleration.projectionWithNormal(normal);
    //    this.app.collisionLine.rotation = normal.rad();
    //    this.app.collisionNormalLine.rotation = normal.normal().rad();
    //    this.app.collisionOutputLine.rotation = projectionVector.rad();
    //    this.app.collisionInputLine.rotation = ball.acceleration.rad();
    //    ball.acceleration.copy(projectionVector);
    //}
    //
    //topS = (ball) => this.item.y - ball.item.y;
    //bottomS = (ball) => ball.item.y - this.item.y - this.thick;
    //leftS = (ball) => this.item.x - ball.item.x;
    //rightS = (ball) => ball.item.x - this.item.x - this.length;
};
