/**
 * Author: DrowsyFlesh
 * Create: 2019-04-10
 * Description:
 */
    //import EventEmitter from 'events';

export class EffectManager {
    thing;
    effects = new Map();

    //emitter = new EventEmitter();

    /**
     *
     * @param thing {Thing}
     */
    constructor(thing) {
        this.thing = thing;
    }

    /**
     *
     * @param effect {Effect}
     */
    add(effect) {
        this.effects.set(effect.id, effect);
        return this;
    }

    remove(effectId) {
        this.effects.delete(effectId);
        return this;
    }

    eachActive(callback) {
        this.each((effect, eid) => {
            if (effect.active) {
                callback(effect, eid);
            }
        });
        return this;
    }

    each(callback) {
        this.effects.forEach((effect, eid) => {
            callback(effect, eid);
        });
    }

    apply() {
        this.each((effect) => {
            effect.apply();
        });
        return this;
    }

}
