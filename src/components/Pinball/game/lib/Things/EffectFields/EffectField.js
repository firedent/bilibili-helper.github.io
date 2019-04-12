/**
 * Author: DrowsyFlesh
 * Create: 2019-04-08
 * Description: 效果场，简称EF
 */
import {Thing} from 'Pinball/game/lib/Things/Thing';

export class EffectField extends Thing {
    _entryEffectMap = new Map();

    /**
     * 场母体类型
     * @type {string}
     */
    type = 'effectField';

    /**
     * 场内的物体
     * @type {Object<Thing>}
     */
    fieldEntries = new Map();

    /**
     * 场效果类型
     * @type {string}
     */
    effectType;

    /**
     * 场持有者
     */
    holder;

    manager;

    constructor(options) {
        super(options);
    }

    /**
     * 进场事件
     */
    enter(thing) {}

    /**
     * 留场事件
     */
    over(thing) {}

    /**
     * 离场事件
     */
    leave(thing) {}

    /**
     * 场销毁时
     */
    destroy() {

    }

    /**
     * 给物体施加效果
     * @param thing
     */
    giveEffect(thing, callback) {}

    removeEffect(thing) {}

    hasGiven(thing) {
        return this._entryEffectMap.has(thing.id);
    }

    give(thing, effect) {
        this._entryEffectMap.set(thing.id, effect.id);
        thing.addEffect(effect);
        return this;
    }

    remove(thing) {
        const eid = this._entryEffectMap.get(thing.id);
        thing.effectManager.removeById(eid);
        this._entryEffectMap.delete(thing.id);
        return this;
    }

    /**
     * @param thing {Thing} 碰撞对象
     * @return {Thing}
     */
    collisionWithThingAndApply(thing) {
        super.collisionWithThingAndCallback(thing, (collisionRes) => {
            const has = this.fieldEntries.has(thing.id);
            if (collisionRes === false && !has) return;
            if (collisionRes === false && has) { // 本来在场中的，离开了场
                this.fieldEntries.delete(thing.id);
                this.leave(thing);
            } else if (this.fieldEntries.has(thing.id)) { // 已经在场内，仍旧在场中
                this.over(thing);
            } else if (collisionRes !== false && !has) { // 刚进入场
                this.enter(thing);
                this.fieldEntries.set(thing.id, thing);
            }
        });
        return this;
    }
}
