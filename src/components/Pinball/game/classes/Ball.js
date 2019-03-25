/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import {Vector2} from 'Components/Pinball/game/lib';
import {Graphics} from 'pixi.js';

export class Ball {
    constructor({
        app,
        color = 0xffffff,
        radius = 10,
        position = new Vector2(0, 0),
        velocity = new Vector2(0, 0),
        acceleration = new Vector2(0, 0),
    }) {
        this.color = color;
        this.radius = radius;
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        if (app) this.init(app);
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
        const currentVelocity = this.velocity.clone().add(this.acceleration).multiplyScalar(delta);
        //console.log(delta);
        const currentPosition = this.position.clone().add(currentVelocity);
        return this.setPosition(currentPosition);
    }

    setPositionX(x) {
        this.position.setX(x);
        this.item.x = x;
    }

    setPositionY(y) {
        this.position.setY(y);
        this.item.y = y;
    }

    setPosition(x, y) {
        if (typeof x === 'number' && typeof y === 'number') {
            this.setPositionX(x);
            this.setPositionY(y);
        } else if (x instanceof Vector2) {
            this.setPositionX(x.x);
            this.setPositionY(x.y);
        }
        return this;
    }

    collisionCheckWithMap(width, height) {
        if (this.position.x < this.radius) {
            this.position.x = this.radius;
            this.velocity.negateX();
            this.acceleration.negateX();
        } else if (this.position.x + this.radius > width) {
            this.position.x = width - this.radius;
            this.velocity.negateX();
            this.acceleration.negateX();
        }
        if (this.position.y < this.radius) {
            this.position.y = this.radius;
            this.velocity.negateY();
            this.acceleration.negateY();
        } else if (this.position.y + this.radius > height) {
            this.position.y = height - this.radius;
            this.velocity.negateY();
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

        let modified = false;

        // 弹板四面回弹处理
        const atUpOrDown = this.item.x >= target.item.x + target.radius && this.item.x <= target.item.x + target.width - target.radius;
        if (atUpOrDown) {
            if (Math.abs(topS) < Math.abs(bottomS)) {
                if (topS < this.radius) {
                    this.velocity.negateY();
                    this.acceleration.negateY();
                    this.setPositionY(this.item.y - (this.radius - topS));
                    modified = true;
                }
            } else if (bottomS < this.radius) {
                this.velocity.negateY();
                this.acceleration.negateY();
                this.setPositionY(this.item.y + (this.radius - bottomS));
                modified = true;
            }
        }

        const atLeftOrRight = this.item.y >= target.item.y + target.radius && this.item.y <= target.item.y + target.height - target.radius;
        if (atLeftOrRight) {
            if (Math.abs(leftS) < Math.abs(rightS)) {
                if (leftS < this.radius) {
                    this.velocity.negateX();
                    this.acceleration.negateX();
                    this.setPositionX(this.item.x - (this.radius - leftS));
                    modified = true;
                }
            } else if (rightS < this.radius) {
                this.velocity.negateX();
                this.acceleration.negateX();
                this.setPositionX(this.item.x + (this.radius - rightS));
                modified = true;
            }
        }
        if (modified) return this;

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
        if (distance < this.radius + target.radius) {
            let normalVector = point.clone().sub(this.position);
            //console.log(this.velocity.angle(), normalVector.angle());

            // 嵌入时位置调整
            const delta = normalVector.length();
            const deltaVector = normalVector.clone().setLength(this.radius + target.radius - delta);

            this.position.sub(deltaVector);
            this.setPosition(this.position);

            let projectionVector = this.velocity.clone().projectionWithNormal(normalVector);
            this.velocity.setRadian(projectionVector.radian());
            //console.log(this.velocity.angle());
            this.acceleration.setRadian(projectionVector.radian());
            return true;
        }
    }

    topS = (target) => target.item.y - this.item.y;
    bottomS = (target) => this.item.y - target.item.y - target.height;
    leftS = (target) => target.item.x - this.item.x;
    rightS = (target) => this.item.x - target.item.x - target.width;
};
