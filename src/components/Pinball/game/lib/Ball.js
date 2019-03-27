/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import {Vector2, MovableCircle} from 'Components/Pinball/game/lib';

export class Ball extends MovableCircle {
    constructor(options = {}) {
        options = Object.assign(options, {
            maxVelocity: 5,
            maxAcceleration: 5,
        });
        super(options);
    }

    collisionCheckWithMap(width, height) {
        if (this.position.x < this.radius) {
            this.position.x = this.radius;
            this.velocity.negateX();
            //this.acceleration.setY(1);
        } else if (this.position.x + this.radius > width) {
            this.position.x = width - this.radius;
            this.velocity.negateX();
            //this.acceleration.setY(1);
        }
        if (this.position.y < this.radius) {
            this.position.y = this.radius;
            this.velocity.negateY();
            this.acceleration.setY(0);
        } else if (this.position.y + this.radius > height) {
            this.position.y = height - this.radius;
            this.velocity.negateY();
            this.acceleration.setY(0);
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

        let modified = false;

        // 弹板四面回弹处理
        const atUpOrDown = this.position.x >= target.position.x + target.radius && this.position.x <= target.position.x + target.width - target.radius;
        if (atUpOrDown) {
            if (Math.abs(topS) < Math.abs(bottomS)) {
                if (topS <= this.radius) {
                    this.velocity.negateY();
                    this.setY(this.position.y - (this.radius - topS));
                    modified = true;
                }
            } else if (bottomS <= this.radius) {
                this.velocity.negateY();
                this.setY(this.position.y + (this.radius - bottomS));
                modified = true;
            }
        }

        const atLeftOrRight = this.position.y >= target.position.y + target.radius && this.position.y <= target.position.y + target.height - target.radius;
        if (atLeftOrRight) {
            if (Math.abs(leftS) < Math.abs(rightS)) {
                if (leftS <= this.radius) {
                    this.velocity.negateX();
                    this.setX(this.position.x - (this.radius - leftS));
                    modified = true;
                }
            } else if (rightS <= this.radius) {
                this.velocity.negateX();
                this.setX(this.position.x + (this.radius - rightS));
                modified = true;
            }
        }

        if (modified) {
            return this;
        }

        // 弹板角落回弹处理
        //top left
        if (this.collisionCheckWithCornerCircle({
            target,
            point: target.position.clone().addScalar(target.radius),
        })) return this;

        // top right
        if (this.collisionCheckWithCornerCircle({
            target,
            point: new Vector2(target.position.x + target.width - target.radius, target.position.y + target.radius),
        })) return this;

        // bottom left
        if (this.collisionCheckWithCornerCircle({
            target,
            point: new Vector2(target.position.x + target.radius, target.position.y + target.height - target.radius),
        })) return this;
        // bottom right
        if (this.collisionCheckWithCornerCircle({
            target,
            point: new Vector2(target.position.x + target.width - target.radius, target.position.y + target.height - target.radius),
        })) return this;
    }

    collisionCheckWithCornerCircle({target, point}) {
        const distance = this.position.distanceTo(point);
        if (distance <= this.radius + target.radius) {
            let normalVector = point.clone().sub(this.position);
            // 嵌入时位置调整
            const delta = normalVector.length();
            const deltaVector = normalVector.clone().setLength(this.radius + target.radius - delta);

            this.position.sub(deltaVector);
            this.setPosition(this.position);

            let projectionVector = this.velocity.clone().projectionWithNormal(normalVector);
            this.velocity.setRadian(projectionVector.radian());
            return true;
        }
    }

    topS = (target) => target.position.y - this.position.y;
    bottomS = (target) => this.position.y - target.position.y - target.height;
    leftS = (target) => target.position.x - this.position.x;
    rightS = (target) => this.position.x - target.position.x - target.width;
};
