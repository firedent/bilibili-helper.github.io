/**
 * Author: DrowsyFlesh
 * Create: 2019-04-08
 * Description:
 */
import {SlowdownE} from 'Pinball/game/lib/Effect';
import {EffectField} from 'Pinball/game/lib/Things/EffectFields/EffectField';

export class SlowdownEF extends EffectField {
    effectType = 'slowdown';

    /**
     * 减速幅度
     * @type {number}
     */
    µ;

    /**
     * 一次buff持续时长
     * @type {number}
     */
    duration;

    /**
     * 减速场
     */
    constructor(options) {
        super(options);
        const {µ, duration} = options;
        this.µ = µ;
        this.duration = duration;
    }

    giveEffect(thing) {
        /**
         * 如果场还没有给物体施加过效果
         * 不重复添加
         */
        if (!this.hasGiven(thing)) {
            const effect = new SlowdownE({holder: thing, source: this.holder, µ: this.µ, duration: this.duration, loop: this.duration === undefined ? true : false});
            this.give(thing, effect);
        }
        return this;
    }

    removeEffect(thing) {
        if (this.hasGiven(thing)) {
            this.remove(thing);
        }
        return this;
    }

    enter(thing) {
        return this.giveEffect(thing);
    }

    over(thing) {
        if (!this.duration) this.giveEffect(thing);
        return this;
    }

    leave(thing) {
        return this.removeEffect(thing);
    }

}
