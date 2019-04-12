/**
 * Author: DrowsyFlesh
 * Create: 2019-04-11
 * Description:
 */
import {LimitedVector2} from 'Pinball/game/lib';
import {Thing} from 'Pinball/game/lib/Things';
import {DamagedEF} from 'Pinball/game/lib/Things/EffectFields/DamagedEF';

export class Player extends Thing {
    type = 'player';

    _heal;

    balls = new Map();
    ballOptions = [];

    healTextItem;

    constructor(options) {
        const position = new LimitedVector2(0, options.game.app.screen.height - 30);
        super({
            ...options,
            position,
            width: 300,
            height: 30,
            density: 1,
            color: 0xffcad9,
        });
        this.initHealText();

        const {heal = 1, balls} = options;
        this.heal = heal;
        this.next.heal = heal;
        this.ballOptions = balls;

        this.addEffectField(new DamagedEF({
            game: this.game,
            width: this.width,
            height: this.height + 10,
            density: 0,
            position: position.clone().sub(new LimitedVector2(0, 10)),
            color: 0xffffff,
            alpha: .2,
        }));
    }

    get heal() {
        return this._heal;
    }

    set heal(n) {
        if (this.healTextItem) {
            this.healTextItem.text = n;
        }
        this._heal = n;
    }

    initHealText() {
        this.healTextItem = new PIXI.Text(this.heal, new PIXI.TextStyle({
            fontSize: 16,
            fill: '#fb7299',
        }));
        this.healTextItem.x = 5;
        this.healTextItem.y = 5;
        this.item.addChild(this.healTextItem);
    }

    composite() {
        this.next.heal = this.heal;
    }
}
