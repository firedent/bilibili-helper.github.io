/**
 * Author: DrowsyFlesh
 * Create: 2019-04-08
 * Description:
 */
import {EffectField} from 'Pinball/game/lib/Things/EffectFields/EffectField';

export class SlowdownEF extends EffectField {
    µ; // 减速幅度
    config; // 配置
    timer; // 减速计时器
    counter; // 减速计数器
    whole; // 整体效果标记

    /**
     *
     * @param µ 减速系数
     * @param timer
     * @param counter
     */
    constructor(µ, {timer = 0, counter = 0, whole = false} = {timer: 0, counter: 0, whole: false}) {
        super();
        this.µ = µ;
        this.config = {timer, counter, whole};
    }

    do(thing) {
        super.do(thing);
    }
}
