/**
 * Author: DrowsyFlesh
 * Create: 2019-04-11
 * Description:
 */
export class EffectFieldManager {
    holder;

    effectFields = new Map();

    constructor(thing) {
        this.holder = thing;
    }

    add(EF) {
        EF.manager = this;
        EF.holder = this.holder;
        this.effectFields.set(EF.id, EF);
        this.holder.level.addThing(EF);
    }

    remove(effectFieldId) {
        const EF = this.effectFields.get(effectFieldId);
        if (EF) {
            this.effectFields.delete(effectFieldId);
            this.holder.level.removeThing(EF);
        }
    }
}
