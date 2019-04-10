/**
 * Author: DrowsyFlesh
 * Create: 2019-04-08
 * Description:
 */
import UUID from 'uuid/v1';
import * as PIXI from 'pixi.js';
import 'Pinball/game/lib/Timer';

export class Effect {
    id = new UUID();

    /**
     * 效果持有者
     * @type {Thing}
     */
    holder;

    /**
     * 效果来源
     * @type {Thing}
     */
    source;

    /**
     * 计时器
     * @type {Timer}
     */
    timer;

    /**
     * 激活标记
     * @type {boolean}
     */
    active;

    /**
     * 持久性标记，即如果没有使用计时器，则默认为一次性或者持久性效果
     * @type {boolean}
     */
    lasting;

    /**
     * 重复次数
     * @type {number}
     */
    repeat;

    /**
     * 一次循环时间
     * @type {number}
     */
    duration;

    /**
     * 延迟计算时间
     * @type {number}
     */
    delay;

    /**
     * 效果结束后是否可被回收清理
     * @type {boolean}
     */
    recyclable;

    constructor({holder, source, duration = 0, lasting = false, repeat = 0, delay = 0, recyclable = true}) {
        this.holder = holder;
        this.source = source;
        this.lasting = lasting;
        this.duration = duration;
        this.repeat = repeat;
        this.delay = delay;
        this.recyclable = recyclable;

        this.timer = PIXI.TimerManager.createTimer(duration);
        this.timer.repeat = repeat;
        this.timer.delay = delay;
        this.timer.loop = lasting;
        this.bindEvent();
        this.timer.start();
    }

    bindEvent() {
        this.timer.on('start', () => {
            this.apply();
        });
        this.timer.on('repeat', () => {
            this.apply();
        });
        this.timer.on('end', () => {
            this.disable();
        });
    }

    /**
     * 触发效果
     */
    apply() {}

    /**
     * 禁用效果
     */
    disable() {
        this.active = false;
    }
}
