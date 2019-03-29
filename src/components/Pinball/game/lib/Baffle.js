/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import {LimitedVector2, Block, Vector2} from 'Pinball/game/lib';
import {Easing} from 'Pinball/game/lib/Math/Easing';
import {TweenVector2} from 'Pinball/game/lib/Math/TweenVector2';

const increaseAccelerationBezier = new Easing(
    new LimitedVector2(.42, .22),
    new LimitedVector2(.32, .94),
);

const decreaseAccelerationBezier = increaseAccelerationBezier.flip();
const accelerationSpeed = 3;
const acceleration = new TweenVector2(0, 0).setMinXY(-accelerationSpeed, 0).setMaxXY(accelerationSpeed, 0)  // baffle acceleration
                                           .setTween('increase', {
                                               duration: 3, // fps * seconds
                                               bezier: increaseAccelerationBezier.bezier,
                                           })
                                           .setTween('decrease', {
                                               duration: 5, // fps * seconds
                                               bezier: decreaseAccelerationBezier.bezier,
                                           });
const velocitySpeed = 6;
const velocity = new TweenVector2(0, 0).setMinXY(-velocitySpeed, 0).setMaxXY(velocitySpeed, 0) // baffle velocity
                                       .setTween('increase', {
                                           duration: 3, // fps * seconds
                                           bezier: increaseAccelerationBezier.bezier,
                                       })
                                       .setTween('decrease', {
                                           duration: 6, // fps * seconds
                                           bezier: decreaseAccelerationBezier.bezier,
                                       });

export class Baffle extends Block {
    canMove = true;

    constructor(options = {}) {
        Object.assign(options, {
            width: 100,
            height: 10,
            acceleration,
            velocity,
        });
        super(options);
        this.bindKeyboard();

        this.leftBound = new Vector2(0, this.movable.position.y);
        this.rightBound = new Vector2(this.app.width - this.width, this.movable.position.y);

        this.accelerationSpeed = this.app.guiController.baffle.accelerationSpeed.value.accelerationSpeed;
        this.velocitySpeed = this.app.guiController.baffle.velocitySpeed.value.velocitySpeed;
    }

    createBall(options) {
        const thisPosition = this.movable.position;
        options.position = new LimitedVector2(
            thisPosition.x + this.width / 2 + options.position.x,
            thisPosition.y - options.radius + options.position.y,
        );
        return this.app.createBall(options);
    }

    updateSpeed(accelerationSpeed, velocitySpeed) {
        if (accelerationSpeed !== this.accelerationSpeed) {
            this.accelerationSpeed = accelerationSpeed.value.accelerationSpeed;
            this.movable.acceleration.setMinXY(-this.accelerationSpeed, 0).setMaxXY(this.accelerationSpeed, 0);
        }
        if (velocitySpeed !== this.velocitySpeed) {
            this.velocitySpeed = velocitySpeed.value.velocitySpeed;
            this.movable.velocity.setMinXY(-this.velocitySpeed, 0).setMaxXY(this.velocitySpeed, 0);
        }
    }

    bindKeyboard() {
        const up = this.app.bindKey(document, 'up', 38);
        const down = this.app.bindKey(document, 'down', 40);
        const left = this.app.bindKey(document, 'left', 37);
        const right = this.app.bindKey(document, 'right', 39);
        this.app.addTicker(delta => {
            const {accelerationSpeed, velocitySpeed} = this.app.guiController.baffle;
            this.updateSpeed(accelerationSpeed, velocitySpeed);
            if (!up.down && !down.down && !left.down && !right.down) {
                this.movable.brake(delta);
            }

            //if (up.down) this.moveUp(delta);
            //if (down.down) this.moveDown(delta);

            if (left.down) this.moveLeft(delta);
            if (right.down) this.moveRight(delta);

            if (this.movable.velocity.length > 0) this.collisionCheckWithBox(this.app.width, this.app.height);
        });
    }

    attractBall(ball) {
        const baffleUpCenter = this.center.sub(new Vector2(0, this.height / 2));
        ball.movable.gravitationalPoint = baffleUpCenter;
    }

    unattarctBall(ball) {
        ball.movable.gravitationalPoint = null;
    }

    moveUp(delta) {
        //this.movable.acceleration.setY(-50);
        this.movable.move(delta);
        return this;
    }

    moveDown(delta) {
        //this.movable.acceleration.setY(50);
        this.movable.moveTo(delta);
        return this;
    }

    moveLeft(delta) {
        if (this.app.keyMap.right.down) return this;
        //this.movable.acceleration.setX(-150);
        this.movable.setDelta(delta).setSpeed(this.app.guiController.global.speed.value.speed).moveTo(this.leftBound);
        window.bafflePosition = this.movable.position;
        return this;
    }

    moveRight(delta) {
        if (this.app.keyMap.left.down) return this;
        //this.movable.acceleration.setX(150);
        this.movable.setDelta(delta).setSpeed(this.app.guiController.global.speed.value.speed).moveTo(this.rightBound);
        window.bafflePosition = this.movable.position;
        return this;
    }

    //
    //stopMove() {
    //    //const baffleVelocity = baffleAccelerationBezierEasing((this.maxVelocity - this.velocity.length) / this.maxVelocity);
    //    //this.acceleration.multiplyScalar(baffleVelocity);
    //    //this.velocity.multiplyScalar(baffleVelocity);
    //    this.stopMove();
    //    //window.baffleVelocity = baffleVelocity;
    //    return this;
    //}

    collisionCheckWithBox(width, height) {
        if (this.movable.position.x < 0) {
            this.movable.setX(0);
        } else if (this.movable.position.x + this.width > width) {
            this.movable.setX(width - this.width);
        }
        if (this.movable.position.y < 0) {
            this.movable.setY(0);
        } else if (this.movable.position.y + this.height > height) {
            this.movable.setY(height - this.height);
        }
        return this;
    }
};
