/**
 * Author: DrowsyFlesh
 * Create: 2019-04-08
 * Description: https://github.com/Nazariglez/pixi-timer/blob/master/src/Timer.js
 */
import {utils} from 'pixi.js';


export class Timer extends utils.EventEmitter {
    constructor(time = 0, manager) {
        super();
        this.time = time * 60000; // 60fps
        if (manager) this.addTo(manager);

        this.active = false; // 计时器激活标记
        this.isEnded = false; // 标记计时器是否已经结束一次计时
        this.isStarted = false; // 启动标记
        this.expire = false; // 到期标记，如果为true，则会强制移除该timer而不管是否正常执行结束
        this.delay = 0; // 延迟启动计时器的时长，ms
        this.repeat = 0; // 计数器计数上限
        this.loop = false; // 是否循环，如果为true，则忽略repeat参数

        this._pause = false;
        this._delayTime = 0; // 统计延迟启动经过的ms
        this._elapsedTime = 0; // 记录一次计时更新经过的时长，ms
        this._repeat = 0; // 记录repeat次数
    }

    addTo(manager) {
        this.manager = manager;
        this.manager.addTimer(this);
        return this;
    }

    remove() {
        if (!this.manager) return;
        this.manager.removeTimer(this);
        return this;
    }

    start() {
        this.active = true;
        return this;
    }

    stop() {
        this.active = false;
        this.emit('stop', this._elapsedTime);
        return this;
    }

    pause() {
        this._pause = true;
    }

    restart() {
        this._pause = false;
    }

    reset() {
        this._elapsedTime = 0;
        this._repeat = 0;
        this._delayTime = 0;
        this.isStarted = false;
        this.isEnded = false;
        return this;
    }

    update(delta, deltaMS) {
        if (!this.active || this._pause) return;
        if (this.delay > this._delayTime) {
            this._delayTime += deltaMS;
            return;
        }

        if (!this.isStarted) {
            this.isStarted = true;
            this.emit('start', this._elapsedTime);
        }

        if (this.time > this._elapsedTime) {
            let t = this._elapsedTime + deltaMS;
            let ended = (t >= this.time);

            this._elapsedTime = (ended) ? this.time : t;
            this.emit('update', this._elapsedTime, delta);

            if (ended) {
                if (this.loop || this.repeat > this._repeat) {
                    this._repeat++;
                    this.emit('repeat', this._elapsedTime, this._repeat);
                    this._elapsedTime = 0;
                    return;
                }

                this.isEnded = true;
                this.active = false;
                this.emit('end', this._elapsedTime);
            }
        }
    }
}
