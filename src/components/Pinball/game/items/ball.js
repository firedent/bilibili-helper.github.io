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

    init(app) {
        this.app = app;
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

    collisionCheckWithMap(width, height) {
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

    collisionCheckRoundedRect(target) {
        let topS = this.topS(target);
        if (topS > this.radius) return;
        let bottomS = this.bottomS(target);
        if (bottomS > this.radius) return;
        let leftS = this.leftS(target);
        if (leftS > this.radius) return;
        let rightS = this.rightS(target);
        if (rightS > this.radius) return;

        // 弹板角落回弹处理
        //top left
        if (this.collisionCheckAtCornerCircle({
            target,
            point: target.position.clone().addScalar(target.radius),
        })) return this;

        // top right
        if(this.collisionCheckAtCornerCircle({
            target,
            point: new Vector2(target.position.x + target.width - target.radius, target.position.y + target.radius),
        })) return this;

        // bottom left
        if(this.collisionCheckAtCornerCircle({
            target,
            point: new Vector2(target.item.x + target.radius, target.item.y + target.height - target.radius),
        })) return this;

        // bottom right
        if (this.collisionCheckAtCornerCircle({
            target,
            point: new Vector2(target.item.x + target.width - target.radius, target.item.y + target.height - target.radius),
        })) return this;

        // 弹板四面回弹处理
        const atUpOrDown = this.item.x > target.item.x + target.radius && this.item.x < target.item.x + target.width - target.radius;
        if (atUpOrDown && ((topS > 0 && topS <= this.radius) || (bottomS > 0 && bottomS <= this.radius))) {
            this.acceleration.negateY();
        }
        const atLeftOrRight = this.item.y > target.item.y + target.radius && this.item.y < target.item.y + target.height - target.radius;
        if (atLeftOrRight && ((leftS > 0 && leftS <= this.radius) || (rightS > 0 && rightS <= this.radius))) {
            this.acceleration.negateX();
        }
        return this;
    }

    collisionCheckAtCornerCircle({target, point}) {
        const distance = this.position.distanceTo(point);
        if (distance < this.radius + target.radius) {
            const normalVector = point.sub(this.position);
            this.setBallAcceleration(this, normalVector);
            return true;
        }
    }

    setBallAcceleration(ball, normal) {
        const projectionVector = ball.acceleration.projectionWithNormal(normal);
        //this.app.collisionLine.rotation = normal.rad();
        //this.app.collisionNormalLine.rotation = normal.normal().rad();
        //this.app.collisionOutputLine.rotation = projectionVector.rad();
        //this.app.collisionInputLine.rotation = ball.acceleration.rad();
        ball.acceleration.copy(projectionVector);
    }

    topS = (target) => target.item.y - this.item.y;
    bottomS = (target) => this.item.y - target.item.y - target.height;
    leftS = (target) => target.item.x - this.item.x;
    rightS = (target) => this.item.x - target.item.x - target.width;
};
