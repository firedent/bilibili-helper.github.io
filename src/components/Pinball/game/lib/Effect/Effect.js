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
     * 效果类型
     * @type {string}
     */
    type;

    /**
     * 基础优先级
     * @type {number}
     */
    basePriority = 100;

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
     * 激活标记
     * @type {boolean}
     */
    active;

    /**
     * 效果结束后是否可被回收清理
     * @type {boolean}
     */
    recyclable;

    /**
     * 优先级
     * @type {number}
     */
    priority;

    /**
     * 可叠加标记，即不需要合并操作
     * @type {boolean}
     */
    stackable;

    applied = false;

    isEnded = false;

    constructor({holder, source, priority, recyclable = true, stackable = true}) {
        this.holder = holder;
        this.source = source;
        this.recyclable = recyclable;
        this.stackable = stackable;
        this.priority = priority;
    }

    get finalPriority() {
        return this.basePriority + this.priority;
    }

    /**
     * 启用效果
     * 不论是否是多次作用，都是一次性启用，再通过timer实现repeat
     */
    apply(callback) {
        if (!this.applied) {
            this.applied = true;
            callback();
        }
        return this;
    }

    destroy() {
        this.disable();
    }

    /**
     * 禁用效果
     */
    disable() {
        this.active = false;
    }

    /**
     * 多个同类型效果同时存在时需要进行合并
     * 不同效果合并逻辑可能不同
     */
    merge() {}
}
