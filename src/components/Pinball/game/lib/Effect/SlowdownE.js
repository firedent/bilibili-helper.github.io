/**
 * Author: DrowsyFlesh
 * Create: 2019-04-08
 * Description:
 */
import {Effect} from 'Pinball/game/lib/Effect';
import {SyncCallback} from 'Pinball/game/lib/Things';
import * as PIXI from 'pixi.js';

export class SlowdownE extends Effect {
    type = 'slowdown';
    loop;
    timer;

    /**
     * 减速的百分比数值
     * @type {number}
     */
    µ;

    constructor({holder, source, µ = 0, duration = 1 / 60, loop = false}) {
        super({holder, source, stackable: false});
        this.loop = loop;

        if (µ > 1) µ = 1; // 1为禁止不动
        this.µ = µ;

        if (loop) duration = 1 / 60; // 一帧时长
        this.duration = duration;
    }

    apply() {
        super.apply(() => {
            this.timer = PIXI.TimerManager.createTimer(this.duration);
            this.timer.loop = this.loop;
            this.timer.on('update', () => {
                this.holder.syncManager.add(new SyncCallback((thing, newNext) => {
                    const velocity = newNext.has('velocity') ? newNext.get('velocity').clone() : thing.next.velocity.clone();
                    velocity.length = velocity.length * (1 - this.µ);
                    //newNext.set('velocity', thing.next.velocity.clone());
                    newNext.set('position', thing.position.clone().add(velocity));
                }, this.finalPriority));
            });
            this.timer.on('end', () => {
                this.isEnded = true;
            });
            this.timer.start();
        });
    }

    destroy() {
        this.disable();
        this.timer.stop();
        this.timer.remove();
    }

    /**
     * 减速合并
     * 取两者中减速幅度最大的一个
     * @param effect
     */
    merge(effect) {
        if (effect instanceof SlowdownE) {
            this.µ = Math.max(effect.µ, this.µ);
        }
    }
}
