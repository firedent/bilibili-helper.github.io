/**
 * Author: DrowsyFlesh
 * Create: 2019/3/27
 * Description:
 */
import {Vector2} from 'Pinball/game/lib/Vector2';

export class Movable {
    position;
    rotation;

    velocityTween;
    velocity;
    maxVelocity;

    accelerationTween;
    acceleration;
    maxAcceleration;

    gravitationTween;
    gravitatoin;
    gravitationalPoint;

    constructor({
        position = new Vector2(0, 0),
        rotation = 0,
        velocityTween = (v) => v,
        velocity = new Vector2(0, 0),
        maxVelocity,
        accelerationTween = (a) => a,
        acceleration = new Vector2(0, 0),
        maxAcceleration,
        gravitationTween = (g) => g,
        gravitation = 0, // 引力系数
        gravitationalPoint, // 引力点
    }) {
        Object.assign(this, {
            position,
            rotation,
            velocityTween,
            velocity,
            maxVelocity,
            accelerationTween,
            acceleration,
            maxAcceleration,
            gravitationTween,
            gravitation,
            gravitationalPoint,
        });
    }

    setX(x) {
        if (!this.item) console.error(`Movable has no item to setX`);
        this.position.setX(x);
        this.item.x = x;
    }

    setY(y) {
        if (!this.item) console.error(`Movable has no item to setY`);
        this.position.setY(y);
        this.item.y = y;
    }

    setPosition(x, y) {
        if (typeof x === 'number' && typeof y === 'number') {
            this.setX(x);
            this.setY(y);
        } else if (x instanceof Vector2) {
            this.setX(x.x);
            this.setY(x.y);
        }
        return this;
    }

    move() {
        this.accelerationTween(this.acceleration);
        if (this.maxAcceleration !== undefined && this.maxAcceleration < this.acceleration.length()) {
            this.acceleration.setLength(this.maxAcceleration);
        }

        this.velocity.add(this.acceleration);
        this.velocityTween(this.velocity);
        window.acceleration = this.acceleration.length();
        window.velocity = this.velocity.length();
        if (this.velocity.length() <= 0.001) { // 设定速度小于多少不再移动，精度要求
            this.acceleration.set(0, 0);
            this.velocity.set(0, 0);
            return;
        }

        if (this.maxVelocity !== undefined && this.maxVelocity < this.velocity.length()) {
            this.velocity.setLength(this.maxVelocity);
        }

        const currentPosition = this.position.clone().add(this.velocity);
        return this.setPosition(currentPosition);
    }
}
