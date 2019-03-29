/**
 * Author: DrowsyFlesh
 * Create: 2019/3/27
 * Description:
 */
import {EPSILON, LimitedVector2, Vector2} from 'Pinball/game/lib/Math';

const ZERO_VECTOR = new Vector2(0, 0);

export class Movable {
    delta = 1;
    speed = 1;
    item;

    position = new LimitedVector2(0, 0);
    rotation = 0;

    acceleration = new LimitedVector2(0, 0);

    velocity = new LimitedVector2(0, 0);

    resultVelocity = new LimitedVector2(0, 0);

    gravitation;
    gravitationalPoint;
    velocityUnderGravitation; // 在引力作用下的临时速度

    constructor(options) {
        Object.assign(this, options);
        this.setPosition(this.position);
        this.tweenMap = {};
    }

    // 设置帧速
    setDelta(delta) {
        this.delta = delta;
        return this;
    }

    // 设置全局位移速度
    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    setX(x) {
        if (!this.item) console.error(`Movable has no item to setX`);
        if (this.position.setX(x).checkX(true)) {
            this.item.x = this.position.x;
        }
    }

    setY(y) {
        if (!this.item) console.error(`Movable has no item to setY`);
        if (this.position.setY(y).checkY(true)) {
            this.item.y = this.position.y;
        }
    }

    setPosition(x, y) {
        if (typeof x === 'number' && typeof y === 'number') {
            this.setX(x);
            this.setY(y);
        } else if (x instanceof LimitedVector2) {
            this.setX(x.x);
            this.setY(x.y);
        }
        return this;
    }

    /**
     *
     * @param position [LimitedVector2]
     */
    moveTo(position) {
        if (position && this.position.equals(position)) this.brake(); // 到达目标后开始刹车
        else this.move(position);
        return this;
    }

    move(position) {
        window.moveType = 'move';
        window.acceleration = this.acceleration.length;
        window.velocity = this.velocity.length;
        if (position) {
            const direction = position.clone().sub(this.position); // 获得目标方向
            const targetRadian = direction.radian;
            if (this.acceleration.radian !== targetRadian) {
                this.acceleration.setRadian(targetRadian); // 调整加速度方向
            }
            const accelerationMaxVector = this.acceleration.getMaxXYVector().setRadian(targetRadian);
            this.acceleration.to(accelerationMaxVector, 'increase').checkXY(true); // 变加速，并校验是否超出边界
        }

        this.velocity.add(this.acceleration).checkXY(true); // 由加速度得到速度，并校验是否超出边界
        if (this.velocity.length <= EPSILON) return; // 设定速度小于多少不再移动，精度要求

        this.resultVelocity.copy(this.velocity).multiplyScalar(this.speed * this.delta); // 最终修正速度

        this.setPosition(this.position.add(this.resultVelocity));

        return this;
    }

    brake() {
        window.moveType = 'brake';
        this.acceleration.to(ZERO_VECTOR.clone().sub(this.acceleration), 'decrease').checkXY(true); // 变加速，并校验是否超出边界

        this.velocity.add(this.acceleration).checkXY(true); // 由加速度得到速度，并校验是否超出边界
        this.velocity.to(ZERO_VECTOR.clone().sub(this.velocity), 'decrease').checkXY(true);
        if (this.velocity.length <= EPSILON) return; // 设定速度小于多少不再移动，精度要求

        this.resultVelocity.copy(this.velocity).multiplyScalar(this.speed * this.delta); // 最终修正速度

        this.setPosition(this.position.add(this.resultVelocity));

        return this;
    }

    //
    //moveUnderGravitation(delta = 1) {
    //    this.gravitation = this.gravitationalPoint.sub(this.position);
    //    this.gravitationTween(this.gravitation);
    //    if (this.maxGravitation !== undefined && this.maxGravitation < this.gravitation.length) {
    //        this.gravitation.setLength(this.maxGravitation);
    //    }
    //    if (!this.velocityUnderGravitation) this.velocityUnderGravitation = this.velocity.clone();
    //    this.velocityUnderGravitation.add(this.gravitation);
    //    //console.log(this.velocityUnderGravitation.length, this.gravitation);
    //    this.velocityTween(this.velocityUnderGravitation);
    //
    //    if (this.velocityUnderGravitation.length <= 0.001) { // 设定速度小于多少不再移动，精度要求
    //        return;
    //    }
    //
    //    if (this.maxVelocity !== undefined && this.maxVelocity < this.velocityUnderGravitation.length) {
    //        this.velocityUnderGravitation.setLength(this.maxVelocity);
    //    }
    //    this.velocity.setRadian(this.velocityUnderGravitation.radian);
    //
    //    const currentPosition = this.position.add(this.velocityUnderGravitation.clone().multiplyScalar(this.app.guiController.global.speed * delta));
    //
    //    return this.setPosition(currentPosition);
    //}
    //
    //// 移除引力影响时
    //escapeFromGravitation(delta) {
    //    if (this.gravitationalPoint && !this.tweenMap['escape']) {
    //        this.gravitation = this.gravitationalPoint.sub(this.position);
    //        this.velocity.setRadian(this.velocityUnderGravitation.radian);
    //        this.gravitation.set(0, 0);
    //        this.velocityUnderGravitation.copy(this.velocity);
    //        const currentPosition = this.position.add(this.velocityUnderGravitation.clone().multiplyScalar(this.app.guiController.global.speed * delta));
    //        this.tweenMap['escape'] = null;
    //        this.gravitationalPoint = null;
    //        return this.setPosition(currentPosition);
    //    } else this.move(delta);
    //    return this;
    //}
}
