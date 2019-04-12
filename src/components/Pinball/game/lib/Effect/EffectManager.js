/**
 * Author: DrowsyFlesh
 * Create: 2019-04-10
 * Description: 效果管理器
 */
export class EffectManager {
    thing;
    effects = new Map();

    /**
     *
     * @param thing {Thing}
     */
    constructor(thing) {
        this.thing = thing;
    }

    has(effectType) {
        let has = false;
        this.each((effect) => {
            if (effect.type === effectType) {
                return !(has = true); // 找到后立即跳出循环
            }
        });
        return has;
    }

    /**
     *
     * @param effect {Effect}
     */
    add(newEffect) {
        if (!newEffect.stackable) {
            let found = false;
            this.each((effect) => {
                found = effect.type === newEffect.type;
                if (found) effect.merge(newEffect);
            });
            if (!found) this.effects.set(newEffect.id, newEffect);
        } else {
            this.effects.set(newEffect.id, newEffect);
        }
        return this;
    }

    removeById(effectId) {
        const effect = this.effects.get(effectId);
        if (effect) {
            effect.destroy();
            this.effects.delete(effectId);
        }
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
            if (!effect.applied) { // 没有启用过
                effect.apply();
            }
        });
    }

    /**
     * 清理可回收的效果，排除未激活的
     */
    recycle() {
        this.each((effect, eid) => {
            if (effect.applied && effect.isEnded && effect.recyclable) {
                this.removeById(eid);
            }
        });
    }

    /**
     * 清理所有可回收的效果，包含未激活的
     */
    clear() {
        this.each((effect, eid) => {
            if (effect.applied && effect.isEnded && (!effect.active || effect.recyclable)) {
                this.removeById(eid);
            }
        });
    }
}
