/**
 * Author: DrowsyFlesh
 * Create: 2019-04-11
 * Description:
 */
import {LimitedVector2} from 'Pinball/game/lib/Math';
import {DamagedEF, DamageEF} from 'Pinball/game/lib/Things/EffectFields';
import {Thing} from 'Pinball/game/lib/Things/Thing';

export class Slime extends Thing {
    type = 'living';

    _heal;
    attack;

    /**
     * 攻击距离
     */
    attackRange;

    constructor(options) {
        super(options);
        const {livingConfig} = options;
        if (!livingConfig) {
            console.warn('Living Thing has no living config');
            return;
        }
        this.initHealText();
        const {heal, attack, attackRange = 0} = livingConfig;
        this.heal = heal;
        this.attack = attack;
        this.attackRange = attackRange;

        this.addEffectField(new DamageEF({
            game: this.game,
            position: this.position.clone().sub(new LimitedVector2(attackRange, attackRange)),
            radius: this.radius[0] + attackRange,
            width: this.width + attackRange * 2,
            height: this.height + attackRange * 2,
            density: 0,
            color: 0xffffff,
            alpha: .1,
        }));
        this.addEffectField(new DamagedEF({
            game: this.game,
            position: this.position.clone().sub(new LimitedVector2(attackRange, attackRange)),
            radius: this.radius[0] + attackRange,
            width: this.width + attackRange * 2,
            height: this.height + attackRange * 2,
            density: 0,
            color: 0xffffff,
            alpha: .1,
        }));
    }

    get heal() {
        return this._heal;
    }

    set heal(n) {
        if (this.healTextItem) {
            this.healTextItem.text = n;
            this.healTextItem.x = this.halfWidth - this.healTextItem.width / 2;
            this.healTextItem.y = this.halfHeight - this.healTextItem.height / 2;
        }
        this._heal = n;
    }

    initHealText() {
        this.healTextItem = new PIXI.Text(this.heal, new PIXI.TextStyle({
            fontSize: 16,
            fill: '#fb7299',
        }));
        this.healTextItem.x = this.halfWidth - this.healTextItem.width / 2;
        this.healTextItem.y = this.halfHeight - this.healTextItem.height / 2;
        this.item.addChild(this.healTextItem);
    }

    composite() {
        this.next.heal = this.heal;
        this.next.attack = this.attack;
        return super.composite();
    }
}
