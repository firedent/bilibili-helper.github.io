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


    // collision with sharp corner square
    collisionCheckWithBox(target) {
        let topS = this.topS(target);
        if (topS > this.radius) return;
        let bottomS = this.bottomS(target);
        if (bottomS > this.radius) return;
        let leftS = this.leftS(target);
        if (leftS > this.radius) return;
        let rightS = this.rightS(target);
        if (rightS > this.radius) return;

        // 弹板角落回弹处理
        const angle = this.acceleration.angle();

        //top left
        const topLeftRes = this.collisionCheckAtCornerPoint({
            target, angle,
            point: target.position,
            firstCheck: (angle > 0 && angle < 45) || (angle > 225 && angle < 360),
            secondCheck: angle >= 180 && angle <= 225,
            thirdCheck: angle >= 45 && angle <= 90,
        });
        if (topLeftRes) return this;

        // top right
        const topRightRes = this.collisionCheckAtCornerPoint({
            target, angle,
            point: new Vector2(target.position.x + target.width, target.position.y),
            firstCheck: angle > 135 && angle < 315,
            secondCheck: (angle >= 315 && angle <= 360) || angle === 0,
            thirdCheck: angle >= 90 && angle <= 135,
        });
        if (topRightRes) return this;

        // bottom left
        const bottomLeftRes = this.collisionCheckAtCornerPoint({
            target, angle,
            point: new Vector2(target.item.x, target.item.y + target.height),
            firstCheck: (angle < 135 && angle >= 0) || angle > 315,
            secondCheck: angle >= 135 && angle <= 180,
            thirdCheck: angle >= 270 && angle <= 315,
        });
        if (bottomLeftRes) return this;

        // bottom right
        const bottomRightRes = this.collisionCheckAtCornerPoint({
            target, angle,
            point: new Vector2(target.item.x + target.width, target.item.y + target.height),
            firstCheck: angle > 45 && angle < Math.PI * 225,
            secondCheck: angle >= 0 && angle <= 45,
            thirdCheck: angle >= 225 && angle < 270,
        });
        if (bottomRightRes) return this;

        //// 弹板四面回弹处理
        const atUpOrDown = this.item.x > target.item.x && this.item.x < target.item.x + target.width;
        if (atUpOrDown && ((topS > 0 && topS <= this.radius) || (bottomS > 0 && bottomS <= this.radius))) {
            this.acceleration.negateY();
        }
        const atLeftOrRight = this.item.y > target.item.y && this.item.y < target.item.y + target.height;
        if (atLeftOrRight && ((leftS > 0 && leftS <= this.radius) || (rightS > 0 && rightS <= this.radius))) {
            this.acceleration.negateX();
        }
        return this;
    }

    collisionCheckAtCornerPoint({target, point, angle, firstCheck, secondCheck, thirdCheck}) {
        const distance = this.position.distanceTo(point);
        if (distance < this.radius) {
            if (firstCheck) {
                const normalVector = target.position.clone().sub(this.position);
                this.setBallAcceleration(this, normalVector);
            }
            else if (secondCheck) this.acceleration.negateY(); // 5
            else if (thirdCheck) this.acceleration.negateX(); // 4
            return true;
        }
    }

    setBallAcceleration(ball, normal) {
        const projectionVector = ball.acceleration.projectionWithNormal(normal);
        this.app.collisionLine.rotation = normal.rad();
        this.app.collisionNormalLine.rotation = normal.normal().rad();
        this.app.collisionOutputLine.rotation = projectionVector.rad();
        this.app.collisionInputLine.rotation = ball.acceleration.rad();
        ball.acceleration.copy(projectionVector);
    }

    topS = (target) => target.item.y - this.item.y;
    bottomS = (target) => this.item.y - target.item.y - (target.radius || target.height);
    leftS = (target) => target.item.x - this.item.x;
    rightS = (target) => this.item.x - target.item.x - (target.radius || target.width);
};
