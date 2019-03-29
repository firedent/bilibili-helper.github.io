/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import {Vector2, MovableCircle, CollisionItem, EPSILON} from 'Components/Pinball/game/lib';

export class Ball extends MovableCircle {
    constructor(options = {}) {
        options = Object.assign(options, {
            maxVelocity: 5,
            maxAcceleration: 5,
        });
        super(options);
    }

    collisionCheckWithMap(width, height) {
        const thisPosition = this.movable.position;
        const thisVelocity = this.movable.velocity;

        if (thisPosition.x < this.radius) {
            thisPosition.x = this.radius;
            thisVelocity.negateX();
        } else if (thisPosition.x + this.radius > width) {
            thisPosition.x = width - this.radius;
            thisVelocity.negateX();
        }
        if (thisPosition.y < this.radius) {
            thisPosition.y = this.radius;
            thisVelocity.negateY();
        } else if (thisPosition.y + this.radius > height) {
            thisPosition.y = height - this.radius;
            thisVelocity.negateY();
        }
        return this;
    }

    collisionCheckRoundedRect(target) {
        let topS = this.topS(target);
        if (topS > EPSILON) return;
        let bottomS = this.bottomS(target);
        if (bottomS > EPSILON) return;
        let leftS = this.leftS(target);
        if (leftS > EPSILON) return;
        let rightS = this.rightS(target);
        if (rightS > EPSILON) return;

        let modified = false;
        const targetMov = target.movable;
        const thisMov = this.movable;
        const targetPosition = targetMov.position;
        const thisPosition = thisMov.position;
        const thisVelocity = thisMov.velocity;

        // 弹板四面回弹处理
        const atUpOrDown = thisPosition.x - (targetPosition.x + target.radius) >= EPSILON && thisPosition.x - (targetPosition.x + target.width - target.radius) <= EPSILON;
        if (atUpOrDown) {
            if (Math.abs(topS) < Math.abs(bottomS)) {
                if (topS <= EPSILON) {
                    thisVelocity.negateY();
                    thisMov.setY(thisPosition.y + topS);
                    modified = true;
                }
            } else if (bottomS <= EPSILON) {
                thisVelocity.negateY();
                thisMov.setY(thisPosition.y - bottomS);
                modified = true;
            }
        }

        const atLeftOrRight = thisPosition.y - (targetPosition.y + target.radius) >= EPSILON && thisPosition.y - (targetPosition.y + target.height - target.radius) <= EPSILON;
        if (atLeftOrRight) {
            if (Math.abs(leftS) < Math.abs(rightS)) {
                if (leftS - this.radius <= EPSILON) {
                    thisVelocity.negateX();
                    thisMov.setX(thisPosition.x + leftS);
                    modified = true;
                }
            } else if (rightS - this.radius <= EPSILON) {
                thisVelocity.negateX();
                thisMov.setX(thisPosition.x - rightS);
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
            point: targetPosition.clone().addScalar(target.radius),
        })) return this;

        // top right
        if (this.collisionCheckWithCornerCircle({
            target,
            point: new Vector2(targetPosition.x + target.width - target.radius, targetPosition.y + target.radius),
        })) return this;

        // bottom left
        if (this.collisionCheckWithCornerCircle({
            target,
            point: new Vector2(targetPosition.x + target.radius, targetPosition.y + target.height - target.radius),
        })) return this;
        // bottom right
        if (this.collisionCheckWithCornerCircle({
            target,
            point: new Vector2(targetPosition.x + target.width - target.radius, targetPosition.y + target.height - target.radius),
        })) return this;
    }

    collisionCheckWithCornerCircle({target, point}) {
        const thisMov = this.movable;
        const thisPosition = this.movable.position;
        const thisVelocity = this.movable.velocity;

        const distance = thisPosition.distanceTo(point);
        if (distance - (this.radius + target.radius) <= EPSILON) {
            let normalVector = thisPosition.clone().sub(point);
            window.angle = normalVector.angle;
            // 嵌入时位置调整
            const difference = normalVector.length;
            const amendVector = normalVector.clone().setLength(this.radius + target.radius - difference); // 修正向量

            thisPosition.add(amendVector);
            thisMov.setPosition(thisPosition);

            let projectionVector = thisVelocity.negate().projectionWithNormal(normalVector);
            thisVelocity.setRadian(projectionVector.radian);
            return true;
        } else return false;
    }

    topS = (target) => target.movable.position.y - this.movable.position.y - this.radius;
    bottomS = (target) => this.movable.position.y - target.movable.position.y - target.height - this.radius;
    leftS = (target) => target.movable.position.x - this.movable.position.x - this.radius;
    rightS = (target) => this.movable.position.x - target.movable.position.x - target.width - this.radius;
};
