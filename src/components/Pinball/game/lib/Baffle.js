/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import BezierEasing from 'bezier-easing';
import {Vector2, Block} from 'Pinball/game/lib';

const baffleAccelerationBezierEasing = BezierEasing(1, 0, 0, 1);

export class Baffle extends Block {
    canMove = true;

    constructor(options = {}) {
        const {speed = 1} = options;
        Object.assign(options, {
            width: 100,
            height: 10,
        });
        super(options);
        this.speed = speed;
        this.maxVelocity = new Vector2(this.width * 0.07, this.height * 0.1);
        this.maxAcceleration = new Vector2(this.width * 0.7, this.height * 0.1);
        this.accelerationTween = function(a) {
            a.multiplyScalar(baffleAccelerationBezierEasing(a.length() / this.maxAcceleration) * this.speed);
        };
        this.velocityTween = function(v) {
            v.multiplyScalar(1 - baffleAccelerationBezierEasing((this.maxVelocity - v.length()) / this.maxVelocity) * 30 / this.speed);
        };
        this.bindKeyboard();
    }

    createBall(options) {
        options.position = new Vector2(
            this.position.x + this.width / 2 + options.position.x,
            this.position.y - options.radius + options.position.y,
        );
        return this.app.createBall(options);
    }

    bindKeyboard() {
        const up = this.app.bindKey(document, 38);
        const down = this.app.bindKey(document, 40);
        const left = this.app.bindKey(document, 37);
        const right = this.app.bindKey(document, 39);
        this.app.addTicker(delta => {
            !up.down && !down.down && !left.down && !right.down && this.move();
            //if (up.down) this.moveUp(delta);
            //if (down.down) this.moveDown(delta);
            if (left.down) this.moveLeft(delta);
            if (right.down) this.moveRight(delta);
            if (this.velocity.length() > 0) this.collisionCheckWithBox(this.app.width, this.app.height);
        });
    }

    moveUp() {
        this.acceleration.setY(-50);
        this.move();
        return this;
    }

    moveDown() {
        this.acceleration.setY(50);
        this.move();
        return this;
    }

    moveLeft() {
        this.acceleration.setX(-150);
        this.move();
        return this;
    }

    moveRight() {
        this.acceleration.setX(150);
        this.move();
        return this;
    }

    //
    //stopMove() {
    //    //const baffleVelocity = baffleAccelerationBezierEasing((this.maxVelocity - this.velocity.length()) / this.maxVelocity);
    //    //this.acceleration.multiplyScalar(baffleVelocity);
    //    //this.velocity.multiplyScalar(baffleVelocity);
    //    this.stopMove();
    //    //window.baffleVelocity = baffleVelocity;
    //    return this;
    //}

    collisionCheckWithBox(width, height) {
        if (this.position.x < 0) {
            this.setX(0);
        } else if (this.position.x + this.width > width) {
            this.setX(width - this.width);
        }
        if (this.position.y < 0) {
            this.setY(0);
        } else if (this.position.y + this.height > height) {
            this.setY(height - this.height);
        }
        return this;
    }
};
