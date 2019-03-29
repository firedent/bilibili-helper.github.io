/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import {Vector2, MovableCircle, CollisionItem} from 'Components/Pinball/game/lib';
import {MixClasses} from 'Pinball/game/utils/MixClasses';

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
        if (topS > this.radius) return;
        let bottomS = this.bottomS(target);
        if (bottomS > this.radius) return;
        let leftS = this.leftS(target);
        if (leftS > this.radius) return;
        let rightS = this.rightS(target);
        if (rightS > this.radius) return;

        let modified = false;
        const targetMov = target.movable;
        const thisMov = this.movable;
        const targetPosition = targetMov.position;
        const thisPosition = thisMov.position;
        const thisVelocity = thisMov.velocity;

        // 弹板四面回弹处理
        const atUpOrDown = thisPosition.x >= targetPosition.x + target.radius && thisPosition.x <= targetPosition.x + target.width - target.radius;
        if (atUpOrDown) {
            if (Math.abs(topS) < Math.abs(bottomS)) {
                if (topS <= this.radius) {
                    thisVelocity.negateY();
                    thisMov.setY(thisPosition.y - (this.radius - topS));
                    modified = true;
                }
            } else if (bottomS <= this.radius) {
                thisVelocity.negateY();
                thisMov.setY(thisPosition.y + (this.radius - bottomS));
                modified = true;
            }
        }

        const atLeftOrRight = thisPosition.y >= targetPosition.y + target.radius && thisPosition.y <= targetPosition.y + target.height - target.radius;
        if (atLeftOrRight) {
            if (Math.abs(leftS) < Math.abs(rightS)) {
                if (leftS <= this.radius) {
                    thisVelocity.negateX();
                    thisMov.setX(thisPosition.x - (this.radius - leftS));
                    modified = true;
                }
            } else if (rightS <= this.radius) {
                thisVelocity.negateX();
                thisMov.setX(thisPosition.x + (this.radius - rightS));
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
        if (distance <= this.radius + target.radius) {
            let normalVector = point.clone().sub(thisPosition);
            // 嵌入时位置调整
            const delta = normalVector.length;
            const deltaVector = normalVector.clone().setLength(this.radius + target.radius - delta);

            thisPosition.sub(deltaVector);
            thisMov.setPosition(thisPosition);

            let projectionVector = thisVelocity.clone().projectionWithNormal(normalVector);
            thisVelocity.setRadian(projectionVector.radian);
            return true;
        }
    }

    topS = (target) => target.movable.position.y - this.movable.position.y;
    bottomS = (target) => this.movable.position.y - target.movable.position.y - target.height;
    leftS = (target) => target.movable.position.x - this.movable.position.x;
    rightS = (target) => this.movable.position.x - target.movable.position.x - target.width;
};
