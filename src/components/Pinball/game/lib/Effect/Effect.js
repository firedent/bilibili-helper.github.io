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

    // 效果持有者
    holder;

    // 效果来源
    source;

    // 计时器
    timer;

    // 激活标记
    active;

    // 持久性标记，即如果没有使用计时器，则默认为一次性或者持久性效果
    lasting;

    /**
     * 效果
     * @param thing {Thing}
     */
    constructor({holder, duration, source, lasting}) {
        this.holder = holder;
        this.source = source;
        this.lasting = lasting;
        if (duration !== undefined) {
            this.timer = PIXI.TimerManager.createTimer(duration);
        }
    }

    apply() {}
}
