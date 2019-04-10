/**
 * Author: DrowsyFlesh
 * Create: 2019-04-08
 * Description:
 */
import {Effect} from 'Pinball/game/lib/Effect';
import {SyncCallback} from 'Pinball/game/lib/Things';
import * as PIXI from 'pixi.js';

export class SlowdownE extends Effect {
    /**
     * 减速的百分比数值
     * @type {number}
     */
    percent;

    constructor(holder, percent = 0, duration = 1, loop = false) {
        super({holder});
        this.percent = percent;

        this.timer = PIXI.TimerManager.createTimer(duration);
        this.timer.loop = loop;
        this.timer.on('update', (elapsedTime, delta) => {
            this.holder.syncManager.add(new SyncCallback((thing, newNext) => {
                const velocity = newNext.has('velocity') ? newNext.get('velocity').clone() : thing.next.velocity.clone();
                velocity.length = velocity.length * (1 - this.percent);
                newNext.set('position', thing.position.clone().add(velocity));
            }, this.finalPriority));
        });
        this.timer.start();
    }
}
