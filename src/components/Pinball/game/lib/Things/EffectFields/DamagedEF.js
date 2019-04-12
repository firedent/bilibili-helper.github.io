/**
 * Author: DrowsyFlesh
 * Create: 2019-04-12
 * Description: 受损效果场
 */
import {DamagedE} from 'Pinball/game/lib/Effect';
import {EffectField} from 'Pinball/game/lib/Things/EffectFields/EffectField';

export class DamagedEF extends EffectField {
    effectType = 'damaged';

    constructor(options) {
        super(options);
    }

    giveEffect(source) {
        if (!this.hasGiven(source)) {
            const effect = new DamagedE({
                holder: this.holder, // 场持有者是受损方
                source,
            });
            this.give(source, effect);
        }
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

    leave(thing) {
        return this.removeEffect(thing);
    }
}
