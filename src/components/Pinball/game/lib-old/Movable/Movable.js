/**
 * Author: DrowsyFlesh
 * Create: 2019/3/27
 * Description:
 */
import {EPSILON, LimitedVector2} from 'Pinball/game/lib-old/Math';
import {MovableActionManager} from 'Pinball/game/lib-old/Movable/MovableActionManager';

export class Movable {
    delta = 1;
    speed = 1;
    item;

    position = new LimitedVector2(0, 0);
    rotation = 0;

    acceleration = new LimitedVector2(0, 0); // 用于匀加速运动
    dynamicAcceleration; // 用于变速运动
    resultAcceleration; // 最终结果值，可能受其他因素影响，如外力，BUFF，DEBUFF

    velocity = new LimitedVector2(0, 0);
    resultVelocity = new LimitedVector2(0, 0); // 为了设置的时候不重新创建新的对象而这么做的

    actionManager = new MovableActionManager();

    constructor(options) {
        Object.assign(this, options);
        this.setPosition(this.position);
    }

    get lastTime() {
        return this.app.app.ticker.lastTime;
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

    setAccelerationToMax(position) { // 加速，将加速度升至最大（正值），导致速度增大
        if (!this.dynamicAcceleration) {
            this.dynamicAcceleration = this.acceleration.clone();
            this.resultAcceleration = this.dynamicAcceleration;
        }
        const direction = position.clone().sub(this.position); // 获得目标方向
        const targetRadian = direction.radian;

        const maxAcceleration = this.dynamicAcceleration.getMax('length'); // 最大值加速度
        if (maxAcceleration - this.dynamicAcceleration.length > EPSILON) {
            this.dynamicAcceleration.toLength(maxAcceleration, 'increase');
        }

        if (this.dynamicAcceleration.radian !== targetRadian) { // 调整加速度方向
            this.dynamicAcceleration.radian = targetRadian;
        }
        return this;
    }

    setAccelerationToZero() { // 趋向匀速，将加速度降低至零
        if (!this.dynamicAcceleration) {
            this.dynamicAcceleration = this.acceleration.clone();
            this.resultAcceleration = this.dynamicAcceleration;
        }

        if (this.dynamicAcceleration.length > EPSILON) {
            this.dynamicAcceleration.toLength(0, 'decrease');
        }
        return this;
    }

    accelerationToMin(position) { // 减速，将加速度降至最小（负值），导致速度降低
        if (!this.dynamicAcceleration) {
            this.dynamicAcceleration = this.acceleration.clone();
        }
        const direction = position.clone().sub(this.position); // 获得目标方向
        const targetRadian = direction.radian;

        const minAcceleration = this.dynamicAcceleration.getMin('length'); // 最小值加速度
        if (this.dynamicAcceleration.length - minAcceleration < EPSILON) {
            this.dynamicAcceleration.toLength(minAcceleration, 'decrease');
        }

        if (this.dynamicAcceleration.radian !== targetRadian) { // 调整加速度方向
            this.dynamicAcceleration.radian = targetRadian;
        }
        return this;
    }

    runAndKeep(position) { // 持续加速
        return this.runTo(position).keepAcceleration();
    }

    runAndRestore(position) { // 加速后维持恒定速度
        return this.runTo(position).restoreAcceleration();
    }

    runAndBrake(position) { // 加速后制动
        return this.runTo(position).brake();
    }

    /**
     * 两个对运动后加速度进行值确定的操作
     * 执行完毕后要最后对resultAcceleration进行确定
     */

    restoreAcceleration() { // 恢复到默认加速度
        return this.actionWrapper(function() {
            if (!this.dynamicAcceleration.equals(this.acceleration)) { // 没有恢复完
                this.actionManager.setAction(this.lastTime, 'restoreAcceleration', false);
                this.dynamicAcceleration.toLength(this.acceleration, 'increase');
            } else { // 恢复结束，终值为acceleration
                this.actionManager.setAction(this.lastTime, 'restoreAcceleration', true);
                this.dynamicAcceleration = undefined;
                this.resultAcceleration = this.acceleration;
            }
            return this;
        });
    }

    keepAcceleration() { // 保持加速度，终值取自dynamicAcceleration
        return this.actionWrapper(function() {
            this.actionManager.setAction(this.lastTime, 'keepAcceleration', true);
            this.acceleration.copy(this.dynamicAcceleration);
            this.dynamicAcceleration = undefined;
            this.resultAcceleration = this.acceleration;
            return this;
        });
    }

    // about velocity
    runTo(position) { // 加速，将速度升至最大（正值）
        return this.actionWrapper(function() {
            const complete = this.position.equals(position);
            if (complete) {
                this.actionManager.setAction(this.lastTime, 'run', true);
                return this;
            }

            if (position) this.setAccelerationToMax(position); // 增大加速度
            else if (!this.dynamicAcceleration) this.resultAcceleration = this.acceleration;

            this.velocity
                .add(this.resultAcceleration) // 由加速度计算速度
                .checkXY(true); // 校验是否超出边界

            this.actionManager.setAction(this.lastTime, 'run', false);
            return this.calculatePosition();
        });
    }

    // about velocity
    brake() { // brake，turn velocity to zero
        return this.actionWrapper(function() {
            if (this.velocity.length === 0) {
                this.actionManager.setAction(this.lastTime, 'brake', true);
                return this;
            }

            this.setAccelerationToZero();

            this.velocity.toLength(0, 'decrease');

            if (this.velocity.length <= EPSILON) { // 设定速度小于多少不再移动，精度要求
                this.actionManager.setAction(this.lastTime, 'brake', true);
                return this;
            } else {
                this.actionManager.setAction(this.lastTime, 'brake', false);
                return this.calculatePosition();
            }
        });
    }

    // about velocity
    reversingTo(position) { // move back，将速度降至最小值（负值）
        return this.actionWrapper(function() {
            if (this.position.equals(position)) {
                this.actionManager.setAction(this.lastTime, 'reversing', true);
                return this;
            }

            this.actionManager.setAction(this.lastTime, 'reversing', false);

            if (position) this.accelerationToMin(position); // 减小加速度
            else if (!this.dynamicAcceleration) this.resultAcceleration = this.acceleration;

            this.velocity
                .add(this.resultAcceleration) // 由加速度计算速度
                .checkXY(true); // 校验是否超出边界

            return this.calculatePosition();
        });
    }

    // 使用当前速度计算并设置新位置
    calculatePosition() {
        /**
         * speed - global speed
         * delta - renderer rate
         */
        this.resultVelocity.copy(this.velocity).multiplyScalar(this.speed * this.delta); // 最终修正速度
        window.acceleration = this.resultAcceleration.length;
        this.setPosition(this.position.add(this.resultVelocity));
        return this;
    }

    // 动作包裹函数，如果上一个action未完成则自动跳过，否则执行调用相关回调
    actionWrapper(callback) {
        if (this.actionManager.sameTime(this.lastTime) && !this.actionManager.lastResult) { // 同一帧中上个动作未完成
            return this;
        } else {
            return (callback.bind(this))();
        }
    }
}
