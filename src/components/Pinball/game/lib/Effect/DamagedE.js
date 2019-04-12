/**
 * Author: DrowsyFlesh
 * Create: 2019-04-12
 * Description: 受损效果
 */
import {Effect} from 'Pinball/game/lib/Effect/Effect';
import {SyncCallback} from 'Pinball/game/lib/Things';

export class DamagedE extends Effect {
    type = 'damaged';

    constructor({holder, source}) {
        super({holder, source});
    }

    apply(callback) {
        return super.apply(() => {
            this.isEnded = true;

            if (this.holder['heal'] === undefined) return;

            this.holder.syncManager.add(new SyncCallback((thing, newNext) => {
                const prevHeal = newNext.has('heal') ? newNext.get('heal') : thing.next.heal;
                let damage = (this.source.syncManager.newNext.has('attack') ? this.source.syncManager.newNext.get('attack') : this.source.next.attack) || 0;
                const newHeal = prevHeal === 0 ? 0 : prevHeal - damage;
                newNext.set('heal', newHeal);
            }, this.finalPriority));
        });
    }
}
