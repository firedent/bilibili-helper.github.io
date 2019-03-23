import {Vector2} from 'Components/Pinball/game/lib';

/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import {Graphics} from 'pixi.js';

export class Ball {
    constructor({color = 0xffffff, radius = 10, speed, position = new Vector2(0, 0), acceleration = new Vector2(speed, speed)}) {
        this.color = color;
        this.radius = radius;
        this.speed = speed;
        this.position = position;
        this.acceleration = acceleration;
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

    move() {
        const currentPositionVector = new Vector2(this.item.x, this.item.y);
        const deltaVector = this.acceleration.clone().add(currentPositionVector);
        return this.setPosition(deltaVector.x, deltaVector.y);
    }

    setPosition(x, y) {
        this.position.set(x, y);
        if (typeof x === 'number' && typeof y === 'number') {
            this.item.x = x;
            this.item.y = y;
        } else if (x instanceof Vector2) {
            this.item.x = x.x;
            this.item.y = x.y;
        }
        return this;
    }

    collisionCheckWithMap(width, height) {
        if (this.item.x < this.radius) {
            this.item.x = this.radius;
            this.acceleration.negateX();
        } else if (this.item.x + this.radius > width) {
            this.item.x = width - this.radius;
            this.acceleration.negateX();
        }
        if (this.item.y < this.radius) {
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

        let modified = false;

        // 弹板四面回弹处理
        const atUpOrDown = this.item.x >= target.item.x + target.radius && this.item.x <= target.item.x + target.width - target.radius;
        if (atUpOrDown) {
            if (Math.abs(topS) < Math.abs(bottomS)) {
                if (topS < this.radius) {
                    this.acceleration.negateY();
                    this.item.y -= this.radius - topS;
                    modified = true;
                }
            } else if (bottomS < this.radius) {
                this.acceleration.negateY();
                this.item.y += this.radius - bottomS;
                modified = true;
            }

        }

        const atLeftOrRight = this.item.y >= target.item.y + target.radius && this.item.y <= target.item.y + target.height - target.radius;
        if (atLeftOrRight) {
            if (Math.abs(leftS) < Math.abs(rightS)) {
                if (leftS < this.radius) {
                    this.acceleration.negateX();
                    this.item.x -= this.radius - leftS;
                    modified = true;
                }
            } else if (rightS < this.radius) {
                this.acceleration.negateX();
                this.item.x += this.radius - rightS;
                modified = true;
            }
        }
        if (modified) return this;

        // 弹板角落回弹处理
        //top left
        if (this.collisionCheckAtCornerCircle({
            target,
            point: target.position.clone().addScalar(target.radius),
        })) return this;

        // top right
        if (this.collisionCheckAtCornerCircle({
            target,
            point: new Vector2(target.position.x + target.width - target.radius, target.position.y + target.radius),
        })) return this;

        // bottom left
        if (this.collisionCheckAtCornerCircle({
            target,
            point: new Vector2(target.item.x + target.radius, target.item.y + target.height - target.radius),
        })) return this;

        // bottom right
        if (this.collisionCheckAtCornerCircle({
            target,
            point: new Vector2(target.item.x + target.width - target.radius, target.item.y + target.height - target.radius),
        })) return this;

        return this;
    }

    collisionCheckAtCornerCircle({target, point}) {
        const distance = this.position.distanceTo(point);
        if (distance < this.radius + target.radius) {
            const normalVector = point.sub(this.position);

            const angle = normalVector.angle();
            window.angle = angle;

            const delta = normalVector.length();
            const deltaVector = normalVector.clone().setLength(Math.abs(this.radius + target.radius - delta));
            this.position.sub(deltaVector);
            this.setPosition(this.position);

            const projectionVector = this.acceleration.projectionWithNormal(normalVector);
            this.acceleration.copy(projectionVector);
            return true;
        }
    }

    topS = (target) => target.item.y - this.item.y;
    bottomS = (target) => this.item.y - target.item.y - target.height;
    leftS = (target) => target.item.x - this.item.x;
    rightS = (target) => this.item.x - target.item.x - target.width;
};
